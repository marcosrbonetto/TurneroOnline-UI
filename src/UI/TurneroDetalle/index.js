import React from "react";

//Styles
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

//Router
import { withRouter } from "react-router-dom";

//REDUX
import { connect } from "react-redux";
import { goBack, push } from "connected-react-router";

//Componentes
import { Grid, Typography, Button } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
// import _ from "lodash";

//Mis componentes
import MiContent from "@Componentes/MiContent";
import MiPagina from "@Componentes/MiPagina";
import MiCard from "@Componentes/MiCard";

//Recursos
import ToolbarLogo from "@Resources/imagenes/toolbar_logo.png";

//Rules
import Rules_Turnero from "@Rules/Rules_Turnero";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({
  goBack: () => {
    dispatch(goBack());
  },
  redirigir: url => {
    dispatch(push(url));
  }
});

class TurneroDetalle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id,
      cargando: true,
      cardVisible: false,
      data: undefined,
      error: undefined
    };
  }

  componentDidMount() {
    this.setState({ cargando: true }, () => {
      Rules_Turnero.getDetalle(this.state.id)
        .then(data => {
          console.log(data);
          this.setState({ error: undefined, data: data }, () => {
            setTimeout(() => {
              this.setState({ cardVisible: true });
            }, 300);
          });
        })
        .catch(error => {
          this.setState({ error: error });
        })
        .finally(() => {
          this.setState({ cargando: false });
        });
    });
  }

  onBotonTurneroCalendarioClick = () => {
    this.props.redirigir("/TurneroCalendario/" + this.state.id);
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <MiPagina
          cargando={this.state.cargando}
          toolbarTitulo="Turnero online"
          toolbarClassName={classes.toolbar}
          toolbarRenderLogo={this.renderToolbarLogo}
          toolbarLeftIcon="arrow_back"
          toolbarLeftIconClick={this.props.goBack}
          contentClassName={classes.paginaContent}
        >
          <MiContent className={classes.content}>
            {this.state.data != undefined && (
              <div className={classNames(classes.card, this.state.cardVisible && "visible")}>
                <MiCard>
                  <Grid container spacing={32} direction="row">
                    {/* COntenido principal */}
                    <Grid item xs={12}>
                      <Typography variant="display1">{this.state.data.tramiteNombre}</Typography>
                      <Typography variant="body1">{this.state.data.descripcion}</Typography>
                    </Grid>

                    {/* Ubicaciones */}
                    <Grid item xs={12} sm={8}>
                      {this.state.data.ubicaciones != undefined &&
                        this.state.data.ubicaciones.length != 0 && (
                          <div>
                            <Typography variant="headline">Ubicación</Typography>

                            {this.state.data.ubicaciones.map((ubicacion, index) => {
                              let lat = (ubicacion.latitud || "").replace(",", ".");
                              let lng = (ubicacion.longitud || "").replace(",", ".");

                              let urlMapa =
                                "https://maps.googleapis.com/maps/api/staticmap?center=-31.416110,-64.191006&zoom=17&scale=false&size=300x300&maptype=roadmap&key=AIzaSyCrx7fsnW-aDmoUOvVrsf88WihSe9Vza2g&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7C{lat},{lng}";
                              urlMapa = urlMapa.replace("{lat}", lat);
                              urlMapa = urlMapa.replace("{lng}", lng);

                              return (
                                <div key={index} className={classes.contenedorUbicacion}>
                                  <div className={classes.mapaUbicacion} style={{ backgroundImage: "url(" + urlMapa + ")" }} />
                                  <div className={classes.contenedorUbicacionTextos}>
                                    <Typography variant="body2">{ubicacion.nombre}</Typography>
                                    <Typography variant="body1">{ubicacion.direccion}</Typography>
                                    <Button
                                      onClick={() => {
                                        var win = window.open("https://www.google.com/maps/?q=" + lat + "," + lng, "_blank");
                                        if (win) win.focus();
                                      }}
                                      variant="outlined"
                                      color="primary"
                                      className={classes.ubicacionBotonMapa}
                                    >
                                      Abrir mapa
                                    </Button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                    </Grid>

                    {/* Links */}
                    <Grid item xs={12} sm={4}>
                      {this.state.data.links != undefined &&
                        this.state.data.links.length != 0 && (
                          <div className={classes.contenedorLinksInteres}>
                            <Typography variant="body2">Links de interés</Typography>
                            {this.state.data.links.map((item, index) => {
                              return (
                                <Typography
                                  key={index}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  href={item.url}
                                  component="a"
                                  className={classes.linkInteres}
                                >
                                  {item.alias}
                                </Typography>
                              );
                            })}
                          </div>
                        )}
                    </Grid>

                    {/* Requisitos */}
                    {this.state.data.requisitos != undefined &&
                      this.state.data.requisitos.length != 0 && (
                        <Grid item xs={12}>
                          <div className={classes.contenedorRequisitos}>
                            <Typography variant="headline">Requisitos</Typography>
                            {this.state.data.requisitos.map((requisito, index) => {
                              return (
                                <div key={index} className={classNames("contenedorRequisito")}>
                                  <Typography variant="body2">{requisito.nombre}</Typography>
                                  <Typography variant="body1">{requisito.descripcion}</Typography>

                                  {requisito.links != undefined &&
                                    requisito.links.length != 0 && (
                                      <view className={classes.contenedorLinksRequisito}>
                                        {requisito.links.map((link, index) => {
                                          return (
                                            <Typography
                                              key={index}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              href={link.url}
                                              component="a"
                                              className={classes.linkInteres}
                                            >
                                              {link.alias}
                                            </Typography>
                                          );
                                        })}
                                      </view>
                                    )}
                                </div>
                              );
                            })}
                          </div>
                        </Grid>
                      )}

                    {/* Personas asociadas */}
                    {this.state.data.usuariosAsociados != undefined &&
                      this.state.data.usuariosAsociados.length != 0 && (
                        <Grid item xs={12}>
                          <div className={classes.contenedorUsuarios}>
                            <Typography variant="headline">Personal asociado</Typography>
                            {this.state.data.usuariosAsociados.map((usuario, index) => {
                              return (
                                <div key={index} className={classNames("contenedorUsuario")}>
                                  <Avatar
                                    className={classNames("avatar")}
                                    alt="Adelle Charles"
                                    src={window.Config.URL_CORDOBA_FILES + "/Archivo/" + usuario.identificadorFotoPersonal + "/3"}
                                  />
                                  <div className={classNames("textos")}>
                                    <Typography variant="body2">
                                      {usuario.nombre} {usuario.apellido}
                                    </Typography>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </Grid>
                      )}

                    {/* Botones */}
                    <Grid item xs={12}>
                      <div className={classes.contenedorBotones}>
                        <Button variant="raised" color="primary" onClick={this.onBotonTurneroCalendarioClick}>
                          Ver turnos disponibles
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </MiCard>
              </div>
            )}
          </MiContent>
        </MiPagina>
      </React.Fragment>
    );
  }

  renderToolbarLogo = () => {
    const { classes } = this.props;

    return <div className={classes.logoMuni} style={{ backgroundImage: "url(" + ToolbarLogo + ")" }} />;
  };
}

let componente = TurneroDetalle;
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);
componente = withStyles(styles)(componente);
componente = withRouter(componente);
export default componente;
