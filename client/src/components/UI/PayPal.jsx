import React, { Component } from 'react';

import PaypalExpressBtn from 'react-paypal-express-checkout';

class PayPal extends Component {
    

    render() {

        const onCancel = (data) => {
            console.log(JSON.stringify(data , null, 2));
        }
        const onError = (err) => {
            console.log(JSON.stringify(err , null, 2));
        }
        const onSuccess = (payment) => {
            this.props.onSuccess(payment);
            // {
            //     "paid": true,
            //     "cancelled": false,
            //     "payerID": "WFKX4C8FQNFU8",
            //     "paymentID": "PAYID-LSKV3EQ63E74547EY698484A",
            //     "paymentToken": "EC-3C2131816P764074H",
            //     "returnUrl": "https://www.paypal.com/checkoutnow/error?paymentId=PAYID-LSKV3EQ63E74547EY698484A&token=EC-3C2131816P764074H&PayerID=WFKX4C8FQNFU8",
            //     "address": {
            //     "recipient_name": "test buyer",
            //         "line1": "1 Main St",
            //         "city": "San Jose",
            //         "state": "CA",
            //         "postal_code": "95131",
            //         "country_code": "US"
            // },
            //     "email": "dwilbank-buyer@gmail.com"
            // }
        }
        let env = 'sandbox';
        let currency = 'USD';
        let total = this.props.toPay;
        const client = {
            sandbox: 'AWGySNPzn-2esisfaQ094arAVQ26T_m8iQC6tPHOqHVcaooM38kVUu1mGmDQ-eMT2SIAFItHnV0IpcrY',
            production: ''
        }

        return (
            <div    className="">
                <PaypalExpressBtn   client={client}
                                    env={env}
                                    currency={currency}
                                    total={total}
                                    onCancel={onCancel}
                                    onError={onError}
                                    onSuccess={onSuccess}
                                    style={{size:'large', color:'blue', shape:'rect', label:'checkout'}}/>
            </div>
        );
    }
}


export default PayPal;