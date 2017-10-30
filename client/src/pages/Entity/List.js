import React, { PureComponent } from 'react'
import PageHoc from 'hocs/PageHoc'

class ListEntitiesPage extends PureComponent {
    _onAddNewEntity = () => {
        const { history, match } = this.props
        const { entity } = match.params
        history.push(`/entity/add/${entity}`)
    }

    render() {
        const { entity } = this.props.match.params

        return (
            <div>
                <div className="container">
                    <button
                        className="button is-primary"
                        onClick={this._onAddNewEntity}
                    >
                        Add new {entity}
                    </button>
                </div>

                <div className="container">
                    TODO(AM): Add a table of entities
                </div>
            </div>
        )
    }
}

export default PageHoc(ListEntitiesPage)
