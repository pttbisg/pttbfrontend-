import React from "react";
import { CardBody, FormGroup, Form, Input, Button, Label, Alert } from "reactstrap";
import { Mail, Lock, AlertCircle } from "react-feather";
import { loginWithJWT } from "../../../../redux/actions/auth/loginActions";
import { connect } from "react-redux";
import { history } from "../../../../history";

class LoginJWT extends React.Component {
  state = {
    email: "",
    password: "",
    remember: false,
    error: null
  }

  handleLogin = e => {
    e.preventDefault()
    this.props.loginWithJWT(this.state, res => {
      if(res) {
        this.setState({
          error: res
        })
      }
    })
  }
  render() {
    const { error } = this.state;

    return ( 
      <React.Fragment>
        {error && <Alert color="danger" isOpen={true}>
          <AlertCircle size={15} />{" "}
          <span className="font-small-2">{`${error.code} - ${error.message}`}</span>
        </Alert>}
        <CardBody className="pt-1">
          <Form action="/" onSubmit={this.handleLogin}>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Mail size={15} />
              </div>
              <Label>Email</Label>
            </FormGroup>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Lock size={15} />
              </div>
              <Label>Password</Label>
            </FormGroup>
            <div className="d-flex justify-content-between">
              <Button.Ripple
                color="primary"
                outline
                onClick={() => {
                  history.push("/pages/register")
                }}
              >
                Register
              </Button.Ripple>
              <Button.Ripple color="primary" type="submit">
                Login
              </Button.Ripple>
            </div>
          </Form>
        </CardBody>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    values: state.auth.login
  }
}
export default connect(mapStateToProps, { loginWithJWT })(LoginJWT)
