import React, { PureComponent } from 'react'
import { loadSchema, getEntity } from 'api/entity'
import PageHoc from 'hocs/PageHoc'

class ViewEntityPage extends PureComponent {
    state = {
        isLoading: true,
        schema: {},
        entity: {},
    }

    componentDidMount() {
        const { entityType, entityId } = this.props.match.params
        const loadPromises = [loadSchema(entityType), getEntity(entityId)]

        Promise.all(loadPromises).then(([schema, entity]) =>
            this.setState({
                isLoading: false,
                schema,
                entity,
            }),
        )
    }

    render() {
        const { isLoading, schema, entity } = this.state
        if (isLoading) return <div>Loading...</div>

        return (
            <div>
                <table className="table is-bordered">
                    <tbody>
                        {schema.fields.map(field => (
                            <tr key={field.name}>
                                <th>{field.label}</th>
                                <td>{entity.fields[field.name]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PageHoc(ViewEntityPage)
