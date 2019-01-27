import React from 'react';
import { Statistic, Row, Col, Button } from 'antd';
import {toEOSString} from '../../utils';

const LABEL_STYLE = {marginBottom: "20px"};
const UserWallet = ({wallet}) => {
    return <Row>
        <Col span={8} style={LABEL_STYLE}>
            <Statistic title="Total worth" value={toEOSString(wallet.balance.totalWorth)} />
        </Col>
        <Col span={8} style={LABEL_STYLE}>
            <Statistic title="Liquid tokens" value={toEOSString(wallet.balance.liquidToken)} />
        </Col>
        <Col span={8} style={LABEL_STYLE}>
            <Statistic title="Net staked" value={toEOSString(wallet.balance.netStaked)} />
        </Col>
        <Col span={8} style={LABEL_STYLE}>
            <Statistic title="CPU staked" value={toEOSString(wallet.balance.cpuStaked)} />
        </Col>
    </Row>
};

export default UserWallet;