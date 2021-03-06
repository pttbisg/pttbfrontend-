import React from "react"
import {
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from "reactstrap"
import classnames from "classnames"
import {
  Eye,
  Code,
  Facebook,
  Instagram,
  GitHub,
  Twitter,
  Sun
} from "react-feather"
import { badgeSquareIcons } from "./BadgeSourceCode"

class BadgeSquareIcons extends React.Component {
  state = {
    activeTab: "1"
  }

  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab })
    }
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Square Badges</CardTitle>
            <div className="views">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1"
                    })}
                    onClick={() => {
                      this.toggleTab("1")
                    }}
                  >
                    <Eye size={15} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "2"
                    })}
                    onClick={() => {
                      this.toggleTab("2")
                    }}
                  >
                    <Code size={15} />
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </CardHeader>
          <CardBody>
            <p>
              Use class <code>.badge-square</code> with <code>Badge</code> tag
              to create a square badge.
            </p>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Badge color="primary" className="mr-1 mb-1 badge-square">
                  <Facebook size={12} />
                  <span>Primary</span>
                </Badge>
                <Badge color="success" className="mr-1 mb-1 badge-square">
                  <Instagram size={12} />
                  <span>Success</span>
                </Badge>
                <Badge color="info" className="mr-1 mb-1 badge-square">
                  <Twitter size={12} />
                  <span>Info</span>
                </Badge>
                <Badge color="danger" className="mr-1 mb-1 badge-square">
                  <GitHub size={12} />
                  <span>Danger</span>
                </Badge>
                <Badge color="warning" className="mr-1 mb-1 badge-square">
                  <Sun size={12} />
                  <span>Warning</span>
                </Badge>
              </TabPane>
               <TabPane className="component-code" tabId="2">{badgeSquareIcons}</TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}
export default BadgeSquareIcons
