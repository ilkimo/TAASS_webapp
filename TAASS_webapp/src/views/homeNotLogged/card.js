import React from 'react';

export default class CardTopic extends React.Component {
    render() {
        return (
            <div className="card cardTopic">
                <div className="colorCardTopic" style={{ backgroundColor: this.props.color }} />
                <div className="card-body" style={{ padding: 10 }}>
                    <h className="p-2">
                        <b>{this.props.title}</b>
                    </h>
                </div>
            </div>
        );
    }
}
