import React from "react";
import { Form, FormGroup, Input, Label, Button, Alert } from "reactstrap";
import { AlertCircle } from "react-feather";
import { connect } from "react-redux";
import { signupWithJWT } from "../../../../redux/actions/auth/registerActions";
import { history } from "../../../../history";

class RegisterJWT extends React.Component {
  state = {
    email: "",
    password: "",
    confirmPass: "",
    error: null
  }

  handleRegister = e => {
    e.preventDefault();
    if(this.state.password.trim() !== this.state.confirmPass.trim()) {
      this.setState({
        error: {
          code: 'AUTH',
          message: 'Password and Confirm Password are not match.'
        }
      })
      return;
    }

    this.props.signupWithJWT(
      this.state.email,
      this.state.password, res => {
        if(res) {
          this.setState({
            error: res
          })
        }
      }
    )
  }

  render() {
    const { error } = this.state;

    return (
      <React.Fragment>
        {error && <Alert className="mt-2 mb-2" color="danger" isOpen={true}>
          <AlertCircle size={15} />{" "}
          <span className="font-small-2">{`${error.code} - ${error.message}`}</span>
        </Alert>}
        <Form className="pt-2" action="/" onSubmit={this.handleRegister}>
          <FormGroup className="form-label-group">
            <Input
              type="email"
              placeholder="email"
              required
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
            <Label>Email</Label>
          </FormGroup>
          <FormGroup className="form-label-group">
            <Input
              type="password"
              placeholder="Password"
              required
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
            <Label>Password</Label>
          </FormGroup>
          <FormGroup className="form-label-group">
            <Input
              type="password"
              placeholder="Confirm Password"
              required
              value={this.state.confirmPass}
              onChange={e => this.setState({ confirmPass: e.target.value })}
            />
            <Label>Confirm Password</Label>
          </FormGroup>
          <div className="d-flex justify-content-between">
            <Button.Ripple
              color="primary"
              outline
              onClick={() => {
                history.push("/pages/login")
              }}
            >
              Login
            </Button.Ripple>
            <Button.Ripple color="primary" type="submit">
              Register
            </Button.Ripple>
          </div>
        </Form>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    values: state.auth.register
  }
}
export default connect(mapStateToProps, { signupWithJWT })(RegisterJWT)
