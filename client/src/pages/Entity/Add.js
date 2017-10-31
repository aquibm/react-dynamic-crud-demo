import React from 'react'
import PageHoc from 'hocs/PageHoc'

const AddEntityPage = ({ entityType }) => (
    <div>Adding Entity of type {entityType}</div>
)

export default PageHoc(AddEntityPage)
