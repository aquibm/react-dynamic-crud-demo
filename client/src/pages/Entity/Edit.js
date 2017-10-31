import React from 'react'
import PageHoc from 'hocs/PageHoc'

const EditEntityPage = ({ entityType, entityId }) => (
    <div>
        Editing Entity of type {entityType} with ID {entityId}
    </div>
)

export default PageHoc(EditEntityPage)
