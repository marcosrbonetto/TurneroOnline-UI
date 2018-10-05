import React from "react";

//Styles
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import styles from "./styles";

//Componentes
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
// import Badge from "@material-ui/core/Badge";
// import IconoAccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import LinearProgress from "@material-ui/core/LinearProgress";

//REDUX
import { connect } from "react-redux";
import { cerrarSesion } from "@Redux/Actions/usuario";
import Icon from "@material-ui/core/Icon";

const mapStateToProps = state => {
  console.log(state);
  return { usuario: state.Usuario.usuario };
};

const mapDispatchToProps = dispatch => {
  return {
    cerrarSesion: () => {
      dispatch(cerrarSesion());
    }
  };
};

class MiToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorPopupUsuario: undefined
    };
  }

  onUsuarioPress = event => {
    if (this.props.cargando) return;
    this.setState({ anchorPopupUsuario: event.currentTarget });
  };

  onUsuarioMenuClose = () => {
    if (this.props.cargando) return;
    this.setState({ anchorPopupUsuario: null });
  };

  onBotonCerrarSesionPress = () => {
    if (this.props.cargando) return;
    this.setState({ anchorPopupUsuario: null });
    this.props.cerrarSesion();
    localStorage.removeItem("token");
    window.location.href = window.Config.URL_LOGIN;
  };

  handleDrawerClose = () => {
    if (this.props.cargando) return;
    this.props.onClose();
  };

  handleDrawerOpen = () => {
    if (this.props.cargando) return;

    if (this.props.open) {
      this.props.onClose();
    } else {
      this.props.onOpen();
    }
  };

  render() {
    let { classes, titulo, usuario } = this.props;
    if (usuario == undefined) return null;

    let urlFotoPerfil =
      window.Config.URL_CORDOBA_FILES +
      "/Archivo/" +
      usuario.identificadorFotoPersonal;

    return (
      <AppBar position="absolute" className={classNames(classes.appBar)}>
        <Toolbar
          disableGutters={true}
          className={classNames(classes.toolbar, this.props.className)}
        >
          {this.props.renderLeftIcon != undefined &&
            this.props.renderLeftIcon()}

          {this.props.renderLeftIcon == undefined &&
            this.props.leftIcon != undefined && (
              <div className={classes.menuButton}>
                <IconButton
                  color="inherit"
                  aria-label={this.props.leftIconHint || "Boton del toolbar"}
                  onClick={this.props.leftIconClick}
                >
                  <Icon>{this.props.leftIcon}</Icon>
                </IconButton>
              </div>
            )}

          {this.props.renderLeftIcon == undefined &&
            this.props.leftIcon == undefined && <div style={{ width: 16 }} />}

          {/* Logo muni */}
          {this.props.renderLogo != undefined && this.props.renderLogo()}

          <Typography
            variant="title"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {titulo}
          </Typography>

          {/* Icono del usuario */}
          <IconButton onClick={this.onUsuarioPress} color="inherit">
            <Avatar
              alt="Menu del usuario"
              src={urlFotoPerfil + "/3"}
              className={classNames(classes.icono)}
            />
          </IconButton>
        </Toolbar>

        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorPopupUsuario}
          getContentAnchorEl={null}
          className={classes.menuUsuario}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={Boolean(this.state.anchorPopupUsuario)}
          onClose={this.onUsuarioMenuClose}
        >
          <div className={classes.menuUsuarioInfo} style={{ display: "flex" }}>
            <Avatar
              alt="Menu del usuario"
              src={urlFotoPerfil + "/2"}
              className={classNames(classes.icono)}
            />
            <Typography align="center" variant="subheading" color="inherit">
              {this.props.usuario.nombre + " " + this.props.usuario.apellido}
            </Typography>
          </div>

          <MenuItem onClick={this.handleClose}>Mi perfil</MenuItem>
          <MenuItem divider onClick={this.handleClose}>
            Cambiar contraseña
          </MenuItem>
          <MenuItem onClick={this.onBotonCerrarSesionPress}>
            Cerrar sesión
          </MenuItem>
        </Menu>

        <div
          className={classNames(
            classes.contenedorCargando,
            this.props.cargando == true && classes.contenedorCargandoVisible
          )}
        >
          <LinearProgress color="secondary" />
        </div>
      </AppBar>
    );
  }
}

let componente = undefined;
componente = withStyles(styles)(MiToolbar);
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);
export default componente;
