import React from 'react'
import Head from 'next/head'

import Header from "../components/Header"
import {Row,Col} from "antd"
const Detailed = () => {
  return (
      <>
        <Head>
            <title>Home</title>
        </Head>
        <Header/>
        {/* 主题部分 */}
        <Row className="comm-main" type="flex" justify="center">
              <Col className="comm-left" xs={24} sm={24} md={10} lg={10} xl={10}>
                    左侧
              </Col>
              <Col className="comm-right" xs={0} sm={0} md={12} lg={10} xl={10}>
                    右侧
              </Col>
        </Row>
      </>
  )
}
export default Detailed;