const styles = theme => {
  return {
    paginaContent: {
      display: "flex"
    },
    content: {
      overflow: "auto",
      flex: 1
    },
    miContentContent: {
      maxWidth: "70rem"
    },
    toolbar: {
      backgroundColor: "white",
      "& h2": {
        color: "black"
      },
      "& .material-icons": {
        color: "black"
      }
    },
    logoMuni: {
      marginRight: "16px",
      backgroundPosition: "center",
      minWidth: "126px",
      maxWidth: "126px",
      minHeight: "56px",
      maxHeight: "56px",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain"
    },
    card: {
      opacity: 0,
      transform: "translateY(100px)",
      transition: "all 0.3s",
      pointerEvents: "none",
      "&.visible": {
        pointerEvents: "all",
        opacity: 1,
        transform: "translateY(0px)"
      }
    },
    contenedorBotones: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "flex-end"
    },
    contenedorTitulo: {
      display: "flex",
      alignItems: "center",
      padding: "16px",
      "& h2": {
        flex: 1
      }
    },
    contenedorTabla: {
      backgroundColor: "rgba(0,0,0,0.05)",
      display: "flex",
      "& > .main": {
        flex: 1,
        overflow: "auto",
        backgroundColor: "white",
        boxShadow: "0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)"
      }
    },
    tabla: {
      flex: 1
    },
    contenedorFiltros: {
      width: "100%",
      overflow: "hidden",
      padding: "0",
      maxWidth: 0,
      opacity: 0,
      transition: "opacity 0.3s, max-width 0.3s 0.3s, padding 0.3s 0.3s",
      "&.visible": {
        opacity: 1,
        maxWidth: "10rem",
        transition: "opacity 0.3s 0.3s, max-width 0.3s, padding 0.3s"
      },
      "& .content": {
        padding: "16px"
      }
    },
    botonFiltro: {
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.3s",
      "&.visible": {
        opacity: 1,
        pointerEvents: "auto"
      }
    }
  };
};

export default styles;
