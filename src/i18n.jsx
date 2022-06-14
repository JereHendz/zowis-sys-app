import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // we init with resources
        resources: {
            es: {
                translations: {
                    //General Text
                    General: "General",
                    Dashboards: "Cuadros de mando",
                    Widgets: " widgets",
                    Dashboard: "Tablero",
                    Default: "Defecto",
                    Ecommerce: "Comercio electrónico",
                    Chart: "Gráfico",
                    Applications: "Aplicaciones",
                    ReadytouseApps: "Aplicación lista para usar",
                    email: "Correo",
                    placeholderEmail: "Ingrese el correo",
                    cancel: "Cancelar",
                    create: "Crear",
                    update: "Actualizar",
                    delete: "Eliminar",
                    close: "Cerrar",
                    processing: "Procesando...",
                    show: "Mostrar",
                    phoneNumber: "Teléfono",
                    address: "Dirección",
                    placeHolderAddress: "Ingrese la dirección",
                    firstName: "Nombres",
                    lastName: "Apellidos",
                    placeHolderFirstName: "Nombres",
                    placeHolderLastName: "Apellidos",
                    placeHolderPhoneNumber: "Teléfono",
                    errorFirstName: "Debe ingresar el nombre",
                    errorLastName: "Debe ingresar los apellidos",
                    errorPhoneNumber: "Debe ingresar el número de teléfono",
                    errorEmail: "Debe ingresar un correo válido",
                    errorAddress: "Debe ingresar la dirección",
                    errorRequired: "Este campo no puede ser vacío",
                    SingIn: "Usted no tiene usuario logeado",
                    errorCreate: "Error al crear el registro",
                    successCreated: "Registro creado correctamente",
                    successUpdated: "Registro actualizado correctamente",
                    country: "País",
                    department: "Departmento",
                    createdDate: 'Fecha de creación',
                    actions: "Acciones",
                    editInfo: "Editar información",
                    placeHolderSelect: "Seleccione una opción",
                    selectStatus: "Estado",
                    errorStatus: "Debe seleccionar un estado",
                    description: "Descripción",
                    placeHolderDescription: "Ingrese la descripción",
                    newRecord: "Nuevo registro",
                    createInfo: "Ingresar Información",
                    placeHolderGeneralName: "Ingrese nombre",
                    document: "Documento",
                    placeHolderDocument: "Ingrese el número de documento",


                    //employeesComponent
                    employee: "Empleado",
                    employees: "Empleados",
                    titleEmployeeCreate: "Agregar empleado",
                    subtitleEmployeeCreate: "Ingrese la información del empleado",
                    placeholderEmployees: "Seleccione un empleado",
                    errorEmployee: "Debe seleccionar un empleado",
                    positionCompany: "Cargo en la empresa",
                    selectCountry: "Seleccione país",
                    selectDepartment: "Seleccione departamento",
                    selectMunicipio: "Seleccione municipio",
                    dui: "Dui",
                    placeHolderDui: "Dui",
                    placeHolderPositionCompany: "Seleccione un cargo",
                    placeHolderCountry: "Seleccione un país",
                    placeHolderDepartment: "Seleccione un departamento",
                    placeHolderMunicipio: "Seleccione un municipio",
                    errorDui: "Debe ingresar el dui",
                    errorPositionCompany: "Debe selecionar un cargo",
                    errorCountry: "Debe selececionar un país",
                    titleListEmployee: "Lista de empleados",
                    subtitleListEmployee: "Información de los empleados",

                    //UsersComponents
                    user: "Usuario",
                    users: "Usuarios",
                    userName: "Nombre de usuario",
                    errorUserName: "Debe ingresar un nombre de usuario",
                    titleUserCreate: "Agregar usuario",
                    subtitleUserCreate: "Ingrese la información del usuario",
                    placeholderUserName: "Ingresa el nombre de usuario",
                    password: "Contraseña",
                    placeholderPassword: "Ingresa la contraseña",
                    errorPassword: 'Contraseña no válida',
                    passConfirm: "Confirmar contraseña",
                    headPopPass: "La contraseña debe contener",
                    bodyPopPass1: "1- Al menos 6 caracteres.",
                    bodyPopPass2: "2- Incluir al menos una mayúscula.",
                    bodyPopPass3: "3- Al menos un número.",
                    bodyPopPass4: "4- Al menos uno de los símbolos(.*@~#-+:;=^%/)",
                    placeholderPassConfirm: "Confirme la contraseña",
                    errorPassConfirm: "Debe confirmar la contraseña",
                    errorMatchPassword: "Las contraseñas no coinciden",
                    errorSingIn: "Oppss.. El usuario o la contraseña son incorrectass.",
                    titleListUsers: "Lista de usuarios",
                    subtitleListUsers: "Visualiza la información de los usuarios",
                    nameFirst: "Nombre",
                    nameLast: "Apellido",
                    usrName: "Usuario",

                    //Category
                    categories: "Categorías",
                    category: "Categoría",
                    placeholderCategory: "Ingrese la categoría",
                    placeholderSelectCategory: "Seleccione una categoría",
                    titleListCategories: "Lista de categorías",

                    //subcategories
                    titleListSubcategories: "Lista de subcategorias",
                    subcategory: "Subcategoría",
                    errorSubCategoryName: "Debe ingresar el nombre de un modelo",

                    //Providers
                    parentProvider: "Proveedores",
                    titleListProviders: "Listado de proveedores",
                    provider: "Proveedor",
                    giro: "Giro",
                    placeHolderGiro: "Ingrese el rubro",
                    placeHolderProvider: "Ingrese el nombre del proveedor",
                    errorProvider:"Debe de seleccionar un proveedor",

                    // List brands
                    titleListBrands: "Lista de marcas",
                    subttleListBrands: "Visualiza la información de la marca",
                    nameBrand: "Marca",
                    descriptionBrand: "Descripción",
                    errorBrandName: "Debe ingresar el nombre de una marca",
                    errorDescription: "Debe ingresar la descripción ",

                    // Product
                    product: "Producto",
                    titleCreateProduct: "Agregar producto",
                    productName: "Nombre del producto",
                    stockLimit: "Límite de existencias",
                    stockProduct: "Existencias",
                    percentageProfit: "Porcentaje de ganancia",
                    barcode: "Código de barra",
                    amount: "Cantidad",
                    unitPrice: "Precio unitario de compra",
                    saleUnitPrice: "Precio de venta",
                    productPhotos: "Seleccionar fotos",
                    errorProductName: "Debe ingresar un nombre de producto",
                    errorCategory: "Debe seleccionar una categoría",
                    errorSubCategory: "Debe seleccionar una subcategoría",
                    errorStockLimit: "Debe ingresar un límite de existencias",
                    errorBarcode: "Debe ingresar un código de barra",
                    errorSelectBrand: "Debe seleccionar una marca",
                    errorAmount: "Debe ingresar una cantidad",
                    errorUnitPrice: "Debe ingresar un precio unitario",
                    errorUnitSalePrice: "Debe ingresar un precio de venta",
                    errorPercentageProfit: "Debe ingresar un porcentaje de ganancia",                    
                    generalInformation: "Información general",
                    enterProduct: "Agregar existencias",
                    positiveAnswer:"Si",
                    negativeAnswer:"No",
                    questionRbtAddProduct:"¿Desea registrar existencias?",
                    choosePicture:"Seleccione imágenes",
                    parentProducts: "Productos",
                    titleListProducts: "Lista de productos",

                }
            },
            en: {
                translations: {
                    // General labels
                    General: "General",
                    Dashboards: "Dashboards",
                    Widgets: "Widgets",
                    Dashboard: "Dashboard",
                    Default: "Default",
                    Ecommerce: "Ecommerce",
                    Chart: "Chart",
                    Applications: "Applications",
                    ReadytouseApps: "Ready to use Apps",
                    email: "Email",
                    placeholderEmail: "Enter the email",
                    cancel: "Cancel",
                    create: "Create",
                    update: "Update",
                    delete: "Delete",
                    close: "Close",
                    processing: "Processing...",
                    show: "Show",
                    firstName: "First Name",
                    lastName: "Last Name",
                    placeHolderFirstName: "First Name",
                    placeHolderLastName: "Last Name",
                    placeHolderPhoneNumber: "Phone Number",
                    errorFirstName: "You must enter the first name",
                    errorLastName: "You must enter the last Name",
                    errorPhoneNumber: "You must enter the phone number",
                    errorEmail: "You must enter a valid email",
                    errorAddress: "You must enter an address",
                    errorRequired: "This field cannot be empty",
                    SingIn: "You do not have a registered user ",
                    successCreated: "Record created successfully",
                    successUpdated: "Record updated successfully",
                    country: "Country",
                    department: "Department",
                    createdDate: 'Created Date',
                    actions: "Actions",
                    phoneNumber: "Phone number",
                    address: "Address",
                    placeHolderAddress: "Enter the address",
                    editInfo: "Edit information",
                    createInfo: "Add information",
                    selectStatus: "Status",
                    errorStatus: "You must select a status",
                    description: "Description",
                    placeHolderDescription: "Enter description",
                    newRecord: "New record",
                    placeHolderGeneralName: "Type a name",
                    document: "Documento",
                    placeHolderDocument: "Ingrese el número de documento",


                    //employeesComponent
                    employee: "Employee",
                    employees: "Employees",
                    placeholderEmployees: "Select an employee",
                    errorEmployee: "You must select an employee",
                    titleEmployeeCreate: "Add Employee",
                    subtitleEmployeeCreate: "Enter employee information",
                    positionCompany: "Position in the company",
                    selectCountry: "Select a country",
                    selectDepartment: "Select a department",
                    selectMunicipio: "Select a Municipio",
                    dui: "Dui",
                    placeHolderDui: "Dui",
                    placeHolderPositionCompany: "Select a position in the company",
                    placeHolderCountry: "Select a country",
                    placeHolderDepartment: "Select a department",
                    placeHolderMunicipio: "Select a Municipio",
                    errorDui: "You must enter a dui",
                    errorPositionCompany: "You must select a position in the company",
                    errorCountry: "You must select a country",
                    // List employee
                    titleListEmployee: "List of Employees",
                    subtitleListEmployee: "Employee information",
                    //UsersCreateComponent
                    user: "User",
                    users: "Users",
                    userName: "User name",
                    errorUserName: "You must enter a username",
                    titleUserCreate: "Add user",
                    subtitleUserCreate: "Here you can add new users",
                    placeholderUserName: "Enter the username",
                    password: "Password",
                    placeholderPassword: "Enter the password",
                    errorPassword: "You must enter a password",
                    passConfirm: "Confirm password",
                    placeholderPassConfirm: "Enter password confirmation",
                    errorPassConfirm: "Confirm your password",
                    errorMatchPassword: "Passwords don't match",

                    //Users list
                    listUsers: "Users list",
                    nameFirst: "First name",
                    nameLast: "Last name",
                    usrName: "User name",

                    //Category
                    categories: "Categories",
                    category: "Category",
                    placeholderCategory: "Enter category",
                    placeholderSelectCategory: "You must select a category",
                    titleListCategories: "Categories list",

                    //subcategories
                    titleListSubcategories: "Subcategories list",
                    subcategory: "Subcategory",

                    //Providers
                    parentProvider: "Providers",
                    titleListProviders: "Providers list",
                    provider: "Providers",
                    placeHolderProvider: "Enter the provider name",
                    giro: "Commercial business",
                    placeHolderGiro: "Enter the comemercial business",
                    errorProvider:"You must choose a provider",

                    // Product
                    product: "Product",
                    titleCreateProduct: "Add product",
                    productName: "Product Name",
                    stockLimit: "Stock",
                    percentageProfit: "Percentage of profit",
                    barcode: "Barcode",
                    amount: "Amount",
                    unitPrice: "Unit purchase price",
                    saleUnitPrice: "Unit sale price",
                    productPhotos: "Choose images",
                    errorProductName: "You must enter a product name",
                    errorCategory: "You must choose a category",
                    errorSubCategory: "You must choose a subcategory",
                    errorStockLimit: "You must enter a stock limit",
                    errorBarcode: "You must enter a barcode",
                    errorSelectBrand: "You must choose a brand",
                    errorAmount: "You must enter a amount",
                    errorUnitPrice: "You must enter an unit price",
                    errorUnitSalePrice: "You must enter an unit price of sale",
                    errorPercentageProfit: "You must enter a percentage profit",                
                    generalInformation: "General information",
                    enterProduct: "Add stock",
                    positiveAnswer:"Yes",
                    negativeAnswer:"No",
                    questionRbtAddProduct:"Would you like to record stock?",
                    choosePicture:"Choose images",
                    parentProducts: "Products",
                    titleListProducts: "Productss list",
                    stockProduct: "Stock",





                }
            },
            cn: {
                translations: {
                    General: "一般",
                    Dashboards: "小部件",
                    Widgets: "小部件",
                    Dashboard: "仪表板",
                    Default: "默认",
                    Ecommerce: "电子商务",
                    Chart: "图表",
                    Applications: "应用领域",
                    ReadytouseApps: "准备使用的应用程序"
                }
            },
            ae: {
                translations: {
                    General: "جنرال لواء",
                    Dashboards: "الحاجيات",
                    Widgets: "لوحات القيادة ",
                    Dashboard: "لوحة القيادة",
                    Default: "إفتراضي",
                    Ecommerce: "التجارة الإلكترونية",
                    Chart: "مخطط",
                    Applications: "التطبيقات",
                    ReadytouseApps: "جاهز لاستخدام التطبيقات"
                }
            },
            du: {
                translations: {
                    General: "Algemeen",
                    Dashboards: "Dashboards",
                    Widgets: " widgets",
                    Dashboard: "Dashboard",
                    Default: "Standaard",
                    Ecommerce: "E-commerce",
                    Chart: "Grafiek",
                    Applications: "Toepassingen",
                    ReadytouseApps: "Klaar om apps te gebruiken"
                }
            },
            fr: {
                translations: {
                    General: "Générale",
                    Dashboards: "Tableaux de bord",
                    Widgets: " widgets",
                    Dashboard: "Tableau de bord",
                    Default: "Défaut",
                    Ecommerce: "Commerce électronique",
                    Chart: "Graphique",
                    Applications: "Applications",
                    ReadytouseApps: "Applications prêtes à l'emploi"
                }
            },
            pt: {
                translations: {
                    General: "Geral",
                    Dashboards: "Painéis",
                    Widgets: " Widgets",
                    Dashboard: "painel de controle",
                    Default: "Padrão",
                    Ecommerce: "Comércio eletrônico",
                    Chart: "Gráfico",
                    Applications: "Formulários",
                    ReadytouseApps: "Aplicativos prontos para usar"
                }
            }
        },
        fallbackLng: "en",
        debug: false,

        // have a common namespace used around the full app
        ns: ["translations"],
        defaultNS: "translations",

        keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
