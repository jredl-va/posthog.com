import React from 'react'
import SectionLink from './SectionLink'

export default function NextArticle({ next, previous, className = '' }) {
    return (
        <div className={`flex justify-between ${className}`}>
            <SectionLink link={previous} previous />
            <SectionLink link={next} />
        </div>
    )
}
