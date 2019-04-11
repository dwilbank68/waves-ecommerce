import React from 'react';
import moment from 'moment';

const HistoryBlock = ({history}) => {

    const renderBlocks = () => (
        history ?
            history.map((h,i) => (
                <tr key={i}>
                    <td>{moment(h.dateOfPurchase).format("MM-DD-YYYY")}</td>
                    <td>{h.purchaseOrder}</td>
                    <td>{h.brand} {h.name}</td>
                    <td>$ {h.price}</td>
                    <td>{h.quantity}</td>
                </tr>
            ))
        :null
    )

    return (
        <div    className="history_blocks">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Purchase Order</th>
                        <th>Product</th>
                        <th>Price Paid</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {renderBlocks()}
                </tbody>
            </table>
        </div>
    );
};

export default HistoryBlock;