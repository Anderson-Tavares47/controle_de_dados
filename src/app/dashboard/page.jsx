"use client";
import * as React from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  createTheme,
  ThemeProvider,
  AppBar,
  Toolbar,
  Grid,
  Paper,
  TextField,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleIcon from "@mui/icons-material/People";
import StoreIcon from "@mui/icons-material/Store";
import LocalConvenienceStoreIcon from "@mui/icons-material/LocalConvenienceStore";
import Logo from "@/assets/img/logo_logaux_v3.png";
import { Padding } from "@mui/icons-material";

// Função para criar tema com suporte a modo escuro/claro
const createDemoTheme = (isDarkMode) =>
  createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: { main: "#091f33" },
      background: { default: "#091f33", paper: "#091f33" },
      text: { primary: "#ffffff", secondary: "#ffffff" },
      divider: "#ffffff",
    },
    typography: { allVariants: { color: "#ffffff" } },
  });

// Cabeçalho com logotipo
function Header() {
    return (
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Box sx={{ height: 40, margin: 4 }}>
            <Image src={Logo} alt="Logaux logo" width={250} height={250} />
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
  

// Definição dos formulários
const formularios = {
  "novo-embarque": {
    title: "Nova Viagem",
    fields: [
      { name: "data", label: "Data" },
      { name: "placaCavalo", label: "Placa do Cavalo" },
      { name: "placaCarreta1", label: "Placa Carreta 1" },
      { name: "placaCarreta2", label: "Placa Carreta 2" },
      { name: "km", label: "KM" },
      { name: "origem", label: "Origem" },
      { name: "destino", label: "Destino" },
      {
        name: "carga",
        label: "Carga",
        select: true,
        options: [
          { value: "opcao1", label: "Opção 1" },
          { value: "opcao2", label: "Opção 2" },
        ],
      },
      { name: "peso", label: "Peso (KG)" },
      { name: "tarifa", label: "Tarifa" },
      { name: "ctrc", label: "CTRC" },
      { name: "nf", label: "NF" },
    ],
  },
  "finalizar-viagem": {
    title: "Finalizar Viagem",
    fields: [
      { name: "data", label: "Data" },
      { name: "km", label: "KM" },
      { name: "fotoComprovante", label: "Foto Comprovante de Entrega" },
    ],
  },
  abastecimento: {
    title: "Abastecimento",
    fields: [
      { name: "data", label: "Data" },
      { name: "km", label: "KM" },
      { name: "nomePosto", label: "Nome do Posto" },
      { name: "quantidadeLitros", label: "Quantidade de Litros" },
      { name: "valorAbastecimento", label: "Valor do Abastecimento" },
      { name: "fotoNotaFiscal", label: "Foto da Nota Fiscal" },
    ],
  },
  servicos: {
    title: "Serviços",
    fields: [
      { name: "data", label: "Data" },
      { name: "km", label: "KM" },
      { name: "nomeOficina", label: "Nome da Oficina" },
      { name: "descricaoServicos", label: "Descrição dos Serviços" },
      { name: "valorServicos", label: "Valor dos Serviços" },
      { name: "fotoNotaFiscal", label: "Foto da Nota Fiscal" },
    ],
  },
  adiantamento: {
    title: "Adiantamento para Despesas de Viagem",
    fields: [
      { name: "data", label: "Data" },
      { name: "numeroRecibo", label: "Nº Recibo" },
      { name: "localidade", label: "Localidade" },
      { name: "valor", label: "Valor" },
      { name: "descricao", label: "Descrição" },
    ],
  },
  deslocamento: {
    title: "Deslocamento",
    fields: [
      { name: "data", label: "Data" },
      { name: "placaCavalo", label: "Placa do Cavalo" },
      { name: "placaCarreta1", label: "Placa Carreta 1" },
      { name: "placaCarreta2", label: "Placa Carreta 2" },
      { name: "km", label: "KM" },
      { name: "origem", label: "Origem" },
      { name: "destino", label: "Destino" },
      { name: "carga", label: "Carga" },
      { name: "peso", label: "Peso" },
      { name: "tarifa", label: "Tarifa" },
      { name: "ctrc", label: "CTRC" },
      { name: "nf", label: "NF" },
    ],
  },
  "contatos-filiais": {
    title: "Contatos Filiais",
    fields: [
      { name: "endereco", label: "Endereço" },
      { name: "telefone", label: "Telefone" },
    ],
  },
  motorista: {
    title: "Motorista",
    fields: [
      { name: "cpf", label: "CPF" },
      { name: "nome", label: "Nome" },
      { name: "senha", label: "Senha" },
      { name: "matricula", label: "Matrícula" },
      { name: "telefone", label: "Telefone" },
    ],
  },
};

// Componente de formulário dinâmico
function FormularioPadrao({ title, fields, onBack }) {
  const [formData, setFormData] = React.useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <IconButton onClick={onBack} sx={{ color: "#ffffff" }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
        {title}
      </Typography>
      <Box component="form">
        {fields.map((field) => (
          <TextField
            key={field.name}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            label={field.label}
            variant="outlined"
            margin="normal"
            fullWidth
            select={field.select}
            InputProps={{ style: { color: "#ffffff" } }}
            InputLabelProps={{ style: { color: "#ffffff" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ffffff" },
                "&:hover fieldset": { borderColor: "" },
                "&.Mui-focused fieldset": { borderColor: "#ffffff" },
              },
            }}
          >
            {field.select &&
              field.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
          </TextField>
        ))}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: "rgb(5, 44, 101)",
            "&:hover": {
              backgroundColor: "#198754",
            },
          }}
        >
          Enviar
        </Button>
      </Box>
    </Box>
  );
}

// Tela principal de navegação
function MainMenu({ onNavigate }) {
  const menuItems = [
    {
      title: "Novo Embarque",
      icon: <LocalShippingIcon />,
      path: "novo-embarque",
    },
    {
      title: "Finalizar Viagem",
      icon: <LocationOnIcon />,
      path: "finalizar-viagem",
    },
    {
      title: "Abastecimento",
      icon: <DirectionsCarIcon />,
      path: "abastecimento",
    },
    { title: "Serviços", icon: <StoreIcon />, path: "servicos" },
    { title: "Adiantamento", icon: <DashboardIcon />, path: "adiantamento" },
    {
      title: "Deslocamento",
      icon: <LocalConvenienceStoreIcon />,
      path: "deslocamento",
    },
    {
      title: "Contatos Filiais",
      icon: <PeopleIcon />,
      path: "contatos-filiais",
    },
    { title: "Motorista", icon: <PeopleIcon />, path: "motorista" },
  ];

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Menu Principal
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.path}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#052c65",
                cursor: "pointer",
                color: "#ffffff",
                "&:hover": { backgroundColor: "#198754" },
              }}
              onClick={() => onNavigate(item.path)}
            >
              {item.icon}
              <Typography variant="h6" sx={{ mt: 1 }}>
                {item.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function App() {
  const [currentPage, setCurrentPage] = React.useState("menu");
  const theme = React.useMemo(() => createDemoTheme(false), []);

  const handleNavigate = (path) => {
    setCurrentPage(path);
  };

  const renderContent = () => {
    if (currentPage === "menu") return <MainMenu onNavigate={handleNavigate} />;
    const formConfig = formularios[currentPage];
    return formConfig ? (
      <FormularioPadrao
        title={formConfig.title}
        fields={formConfig.fields}
        onBack={() => setCurrentPage("menu")}
      />
    ) : null;
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      {renderContent()}
    </ThemeProvider>
  );
}

export default App;
