import React, { useState, Fragment, useEffect } from 'react';
import Breadcrumb from '../../layout/breadcrumb';
import axios from 'axios';
import { Table, Button, InputGroup, Input, Container, Row, Col, Card, CardHeader, CardBody, Form, InputGroupText, Tooltip } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { XCircle } from 'react-feather';
import { classes } from '../../data/layouts';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const CreateSale = () => {
    // To traslate the words
    const { t } = useTranslation();

    //To use navigate function
    const navigate = useNavigate();

    //default layout
    const defaultLayoutObj = classes.find(item => Object.values(item).pop(1) === 'compact-wrapper');
    const layout = localStorage.getItem('layout') || Object.keys(defaultLayoutObj).pop();

    // Get the information of the logged user
    const infoUserLogin = JSON.parse(localStorage.getItem('infoUserLogin'));

    //for control search 1->By barcode, 2->By text
    const [activeTab, setActiveTab] = useState('1');

    //to contro the tooltip
    const [tooltipBar, setTooltipBar] = useState(false);
    const toggleBar = () => setTooltipBar(!tooltipBar);

    const [tooltipText, setTooltipText] = useState(false);
    const toggleText = () => setTooltipText(!tooltipText);

    //var to products cart
    const [cart, setCart] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [productsBusqueda, setProductsBusqueda] = useState([]);

    //loading component 
    const [loading, setLoading] = useState(false);

    const symbol = "$";

    //define sucursal of sale
    let idBranchOffice = 1;

    //define sucursal of sale
    let idClient = 1;

    const blurQuantity = idProduct => e => {
        let newArr = [...cart]; // copying the old datas array
        newArr.map(v => {
            if (v.idProduct == idProduct) {
                var new_quantity = parseInt(e.target.value);
                if(new_quantity > 0){
                    if(new_quantity <= v.stock){
                        v.quantity = parseInt(new_quantity);
                        v.total = parseFloat((v.quantity * v.price) - (v.quantity * v.price * (v.discount / 100)));
                    }else{
                        toast.info(t('invalidStock'));
                        document.getElementById('quantity'+idProduct).value = v.quantity;
                    }
                    
                }else{
                    document.getElementById('quantity'+idProduct).value = v.quantity;
                }
            }
        });

        setCart(newArr);
    }

    const incrementQty = (item, quantity) => {
        let newArr = [...cart]; // copying the old datas array
        newArr.map(v => {
            if (v.idProduct == item.idProduct) {
                if((item.quantity + quantity) <= item.stock){
                    v.quantity += quantity;
                    v.total = parseFloat((v.quantity * v.price) - (v.quantity * v.price * (v.discount / 100)));
                }else{
                    toast.info(t('invalidStock'));
                }
                
            }
        });

        setCart(newArr);
    }

    const decrementQuantity = (idProduct, quantity) => {
        let newArr = [...cart]; // copying the old datas array
        newArr.map(v => {
            if (v.idProduct == idProduct) {
                if(v.quantity > 1){
                    v.quantity -= quantity;
                    v.total = parseFloat((v.quantity * v.price) - (v.quantity * v.price * (v.discount / 100)));
                }
            }
        });

        setCart(newArr);
    }

    const blurDiscount = idProduct => e => {
        let newArr = [...cart]; // copying the old datas array
        newArr.map(v => {
            if (v.idProduct == idProduct) {
                if(e.target.value >= 0 && e.target.value <= 100){
                    v.discount = parseInt(e.target.value);
                }else{
                    document.getElementById('discount'+idProduct).value = v.discount;
                }
            }
        });

        setCart(newArr);
    }

    const incrementDiscount = (item, quantity) => {
        let newArr = [...cart]; // copying the old datas array
        newArr.map(v => {
            if (v.idProduct == item.idProduct) {
                if(v.discount < 100){
                    v.discount += quantity;
                }
            }
        });

        setCart(newArr);
    }

    const decrementDiscount = (idProduct, quantity) => {
        let newArr = [...cart]; // copying the old datas array
        newArr.map(v => {
            if (v.idProduct == idProduct) {
                if(v.discount > 0){
                    v.discount -= quantity;
                }
            }
        });

        setCart(newArr);
    }

    const removefromcart = (idProduct) => {
        setCart(cart.filter(item => item.idProduct !== idProduct));
    }

    const getDiscountTotal = cartItems => {
        var discount = 0;
        var totalDiscount = 0;
        for (var i = 0; i < cartItems.length; i++) {
            discount = cartItems[i].quantity * cartItems[i].price * (cartItems[i].discount / 100);
            totalDiscount += discount;
        }
        return totalDiscount;
    }

    const getCartTotal = cartItems => {
        var total = 0;
        var items = 0;
        for (var i = 0; i < cartItems.length; i++) {

            items = cartItems[i].quantity * cartItems[i].price
            total += items;
        }
        var discount = getDiscountTotal(cartItems);
        total = total - discount;
        return total;
    }

    const searchProduct = (ev) => {
        // Get the list of status only load once time
        if (busqueda !== '') {
            setLoading(true);
            axios
                .get(`${process.env.REACT_APP_DOMAIN_SERVER}api/searchProduct/${busqueda}/${activeTab}/${idBranchOffice}`)
                .then((response) => {
                    setProductsBusqueda(response.data.product);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                });
        }else{
            setProductsBusqueda([])
        }
    }
    const getUnitTotal = (item) => {
        var total = (item.price * item.quantity) - (item.price * item.quantity * (item.discount / 100));
        return total;
    }

    const addProduct = (data) => {
        let banNoExiste = true;
        var item = {
            idProduct: data.id,
            link: data.link,
            barcode: data.barcode,
            nameProduct: data.productName,
            quantity: 1,
            stock: parseFloat(data.stock),
            price: parseFloat(data.unitSalePriceAvg),
            discount: parseInt(data.productDiscount ? data.productDiscount : 0),
            total: parseFloat(data.unitSalePriceAvg)
        };

        cart.map(v => {
            if (v.idProduct == item.idProduct) {
                incrementQty(item, 1);
                banNoExiste = false;
            }
        });

        if(banNoExiste){
            setCart([...cart, item]);
        }

        setProductsBusqueda([]);
        document.getElementById('search').value = '';
    }

    const createSale = () => {
        let data = {
            cart: cart,
            idBranchOffice: idBranchOffice,
            idClient: idClient,
            whoCreated: infoUserLogin.id
        }
        if(cart.length > 0){
            setLoading(true);
            axios.post(`${process.env.REACT_APP_DOMAIN_SERVER}api/sales`, data)
            .then((response) => {
                setLoading(false);
                toast.info(t('successCreated'));
                navigate(`${process.env.PUBLIC_URL}/app/sales/salesList/${layout}`);
            })
            .catch((errors) => {
                setLoading(false);
                toast.warning(t('errorSaleCreate'));
            });
        }else{
            toast.warning(t('warningSaleQuantity'));
        }
    }

    return (
        <Fragment>
            <Breadcrumb parent={t('sales')} title={t('titleSalesCreate')} />
            <Container fluid={true} className="search-page">
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader className="bg-light-primary">
                                <Form className="theme-form">
                                    <InputGroup className="m-0">
                                        <InputGroupText id="tooltipSaleBar" className={activeTab === '1' ? 'theme-form' : 'bg-light-primary'} onClick={() => setActiveTab('1')}>
                                            <i className="fa fa-barcode"></i>
                                        </InputGroupText>
                                        <Tooltip
                                            placement="top"
                                            isOpen={tooltipBar}
                                            target="tooltipSaleBar"
                                            toggle={toggleBar}>
                                            {t('searchTooltipSaleBar')}
                                        </Tooltip>
                                        <InputGroupText id="tooltipSaleText" className={activeTab === '2' ? 'theme-form' : 'bg-light-primary'} onClick={() => setActiveTab('2')}>
                                            <i className="icofont icofont-underline"></i>
                                        </InputGroupText>
                                        <Tooltip
                                            placement="top"
                                            isOpen={tooltipText}
                                            target="tooltipSaleText"
                                            toggle={toggleText}>
                                            {t('searchTooltipSaleText')}
                                        </Tooltip>
                                        {activeTab === '1' ?
                                            <Input id="search" onBlur={searchProduct} className="form-control-plaintext" type="search" placeholder={t('searchProduct')} onChange={(e) => setBusqueda(e.target.value)} />
                                            :
                                            <Input id="search" onKeyUp={searchProduct} className="form-control-plaintext" type="search" placeholder={t('searchProduct')} onChange={(e) => setBusqueda(e.target.value)} />
                                        }
                                        <InputGroupText className="btn btn-primary">{t('search')}</InputGroupText>
                                    </InputGroup>
                                </Form>
                            </CardHeader>
                            <CardBody className="cart">
                                <div className="order-history table-responsive wishlist">
                                    {productsBusqueda.length > 0 ?
                                        <div className="order-history table-responsive wishlist">
                                            <Table className="table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>{t('product')}</th>
                                                        <th>{t('code')}</th>
                                                        <th>{t('productName')}</th>
                                                        <th>{t('stockProduct')}</th>
                                                        <th>{t('price')}</th>
                                                        <th>% {t('discount')}</th>
                                                        <th>{t('actions')}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {productsBusqueda.map((prod, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td><img className="img-fluid img-60" src={prod.link ? prod.link : require("../../assets/images/avtar/3.jpg")} alt="" /></td>
                                                                <td>{prod.barcode}</td>
                                                                <td>{prod.productName}</td>
                                                                <td>{prod.stock}</td>
                                                                <td>{symbol + parseFloat(prod.unitSalePriceAvg).toFixed(2)}</td>
                                                                <td>{prod.productDiscount ? prod.productDiscount : 0}</td>
                                                                <td>
                                                                    <i style={{ cursor: 'pointer' }} className="fa fa-plus-circle fa-2x" onClick={() => addProduct(prod)}></i>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </Table>
                                            <br></br><br></br>
                                        </div>
                                        :
                                        ''}
                                    <Table className="table-bordered">
                                        <thead>
                                            <tr>
                                                <th>{t('product')}</th>
                                                <th>{t('code')}</th>
                                                <th>{t('productName')}</th>
                                                <th>{t('quantity')}</th>
                                                <th>{t('price')}</th>
                                                <th>%{t('discount')}</th>
                                                <th>{t('total')}</th>
                                                <th>{t('actions')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td><img className="img-fluid img-60" src={item.link ? item.link : require("../../assets/images/avtar/3.jpg")} alt="" /></td>
                                                        <td>{item.barcode}</td>
                                                        <td>{item.nameProduct}</td>
                                                        <td>
                                                            <fieldset className="qty-box">
                                                                <div className="input-group">
                                                                    <span className="input-group-prepend">
                                                                        <Button className="quantity-left-minus" onClick={() => decrementQuantity(item.idProduct, 1)}>
                                                                            <i className="fa fa-minus"></i>
                                                                        </Button>
                                                                    </span>
                                                                    <input id={"quantity"+item.idProduct} key={item.quantity} type="text" name="quantity" defaultValue={item.quantity} style={{ textAlign: "center" }} className="form-control input-number" onBlur={blurQuantity(item.idProduct)}/>
                                                                    <span className="input-group-append">
                                                                        <Button className="quantity-right-plus" onClick={() => incrementQty(item, 1)}>
                                                                            <i className="fa fa-plus"></i>
                                                                        </Button>
                                                                    </span>
                                                                </div>
                                                            </fieldset>
                                                        </td>
                                                        <td>{symbol}{item.price.toFixed(2)}</td>
                                                        <td>
                                                            <fieldset className="qty-box">
                                                                <div className="input-group">
                                                                    <span className="input-group-prepend">
                                                                        <Button className="quantity-left-minus" onClick={() => decrementDiscount(item.idProduct, 1)}>
                                                                            <i className="fa fa-minus"></i>
                                                                        </Button>
                                                                    </span>
                                                                    <input id={"discount"+item.idProduct} key={item.discount} type="text" name="discount" defaultValue={item.discount} style={{ textAlign: "center" }} className="form-control input-number" onBlur={blurDiscount(item.idProduct)}/>
                                                                    <span className="input-group-append">
                                                                        <Button className="quantity-right-plus" onClick={() => incrementDiscount(item, 1)}>
                                                                            <i className="fa fa-plus"></i>
                                                                        </Button>
                                                                    </span>
                                                                </div>
                                                            </fieldset>
                                                        </td>
                                                        <td>{symbol} {getUnitTotal(item).toFixed(2)}</td>
                                                        <td>
                                                            <a style={{cursor: 'pointer'}} onClick={() => removefromcart(item.idProduct)}><XCircle /></a>
                                                        </td>
                                                    </tr>

                                                )
                                            })}
                                            <tr>
                                                <td colSpan="5" className="text-start">
                                                    <Button onClick={createSale}className="btn btn-primary cart-btn-transform text-uppercase">{t('pay')}</Button>
                                                </td>
                                                <td className="total-amount">
                                                    <h6 className="m-0 text-end" style={{color: '#909090'}}><span className="f-w-600">{t("discount")} :</span></h6>
                                                    <h6 className="m-0 text-end"><span className="f-w-600">{t("total")} :</span></h6>
                                                </td>
                                                <td>
                                                    <h6 className="mt-2 mb-0" style={{color: '#909090'}}><b><span>{symbol}{getDiscountTotal(cart).toFixed(2)}</span></b></h6>
                                                    <h5><b><span>{symbol}{getCartTotal(cart).toFixed(2)}</span></b></h5>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                                <div className={loading ? 'loader-wrapper back' : 'loader-wrapper back loderhide'}><div className="loader-index">
                                    <span></span></div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default CreateSale;