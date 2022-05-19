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
                    //Textos generales
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
                    processing: "Procesando...",
                    show: "Mostrar",
                    phoneNumber:"Teléfono",
                    address:"Dirección",
                    firstName:"Nombres",
                    lastName:"Apellidos",
                    placeHolderFirstName:"Nombres",
                    placeHolderLastName:"Apellidos",
                    placeHolderPhoneNumber:"Teléfono",    
                    errorFirstName:"Debe ingresar el nombre",
                    errorLastName:"Debe ingresar los apellidos",  
                    errorPhoneNumber:"Debe ingresar el número de teléfono", 
                    errorEmail:"Debe ingresar un correo válido",      
                    errorAddress:"Debe ingresar la dirección",     
                    errorLogin:"Usted no tiene usuario logeado",
                    successCreated:"Registro creado correctamente",
                    country:"País",
                    department:"Departmento",
                    createdDate:'Fecha de creación',
                    actions:"Acciones",
                    editInfo:"Editar información",

                    //employeesComponent
                    employee: "Empleado",
                    employees: "Empleados",                   
                    titleEmployeeCreate: "Agregar empleado",
                    subtitleEmployeeCreate: "Ingrese la información del empleado",
                    placeholderEmployees: "Seleccione un empleado",
                    errorEmployee: "Debe seleccionar un empleado",
                    positionCompany:"Cargo en la empresa",
                    selectCountry:"Seleccione país",
                    selectDepartment:"Seleccione departamento",
                    selectMunicipio:"Seleccione municipio",
                    dui:"Dui",
                    placeHolderDui:"Dui",
                    placeHolderPositionCompany:"Seleccione un cargo",
                    placeHolderCountry:"Seleccione un país",
                    placeHolderDepartment:"Seleccione un departamento",
                    placeHolderMunicipio:"Seleccione un municipio",                    
                    errorDui:"Debe ingresar el dui",
                    errorPositionCompany:"Debe selecionar un cargo",
                    errorCountry:"Debe selececionar un país",
                    // List employee
                    titleListEmployee:"Lista de empleados",
                    subtitleListEmployee:"Información de los empleados",

                    

                    //UsersCreateComponent
                    user: "Usuario",
                    users: "Usuarios",
                    userName: "Nombre de usuario",
                    titleUserCreate: "Agregar usuario",
                    subtitleUserCreate: "Ingrese la información del usuario",
                    placeholderUserName: "Ingresa el nombre de usuario",
                    password: "Contraseña",
                    placeholderPassword: "Ingresa la contraseña",
                    errorPassword: "Debe ingresar una contraseña",
                    passConfirm: "Confirmar ontraseña",
                    placeholderPassConfirm: "Confirme la contraseña",
                    errorPassConfirm: "Debe confirmar la contraseña",
                    errorUserName: "Debe ingresar un nombre de usuario",

                    //lista de usuarios
                    titleListUsers: "Lista de usuarios",
                    subtitleListUsers: "Visualiza la información de los usuarios",
                    nameFirst: "Nombre",
                    nameLast: "Apellido",
                    usrName: "Usuario"
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
                    processing: "Processing...",
                    show: "Show",
                    firstName:"First Name",
                    lastName:"Last Name",
                    placeHolderFirstName:"First Name",
                    placeHolderLastName:"Last Name",
                    placeHolderPhoneNumber:"Phone Number",    
                    errorFirstName:"You must enter the first name",
                    errorLastName:"You must enter the last Name",  
                    errorPhoneNumber:"You must enter the phone number", 
                    errorEmail:"You must enter a valid email",      
                    errorAddress:"You must enter an address",     
                    errorLogin:"You do not have a registered user ",
                    successCreated:"Record created successfully",
                    country:"Country",
                    department:"Department",
                    createdDate:'Created Date',
                    actions:"Actions",
                    phoneNumber:"Phone number",
                    editInfo:"Edit information",

                    //employeesComponent
                    employee: "Employee",
                    employees: "Employees",                    
                    placeholderEmployees: "Select an employee",
                    errorEmployee: "You must select an employee",
                    titleEmployeeCreate: "Add Employee",
                    subtitleEmployeeCreate: "Enter employee information",
                    positionCompany:"Position in the company",
                    selectCountry:"Select a country",
                    selectDepartment:"Select a department",
                    selectMunicipio:"Select a Municipio",
                    dui:"Dui",
                    placeHolderDui:"Dui",
                    placeHolderPositionCompany:"Select a position in the company",
                    placeHolderCountry:"Select a country",
                    placeHolderDepartment:"Select a department",
                    placeHolderMunicipio:"Select a Municipio",                    
                    errorDui:"You must enter a dui",
                    errorPositionCompany:"You must select a position in the company",
                    errorCountry:"You must select a country",
                    // List employee
                    titleListEmployee:"List of Employees",
                    subtitleListEmployee:"Employee information",
                    //UsersCreateComponent
                    user: "User",
                    users: "Users",
                    userName: "User name",
                    titleUserCreate: "Add user",
                    subtitleUserCreate: "Here you can add new users",
                    placeholderUserName: "Enter the username",
                    password: "Password",
                    placeholderPassword: "Enter the password",
                    errorPassword: "You must enter a password",
                    passConfirm: "Confirm password",
                    placeholderPassConfirm: "Enter password confirmation",
                    errorPassConfirm: "Confirm your password",
                    errorUserName: "You must enter a username",

                    //Users list
                    listUsers: "Users list",
                    nameFirst: "First name",
                    nameLast: "Last name",
                    usrName: "User name"
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
