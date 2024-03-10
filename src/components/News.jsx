import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptosQuery } from "../Services/cryptoApi";
import { useGetCryptoNewsQuery } from "../Services/cryptoNewsApi";
import newsImg from "../assets/cryptodesk-logo.png";
import Loader from "./Loader";
const demoImage =
  "https://www.freepik.com/free-photo/newspaper-background-concept_29016072.htm#query=crypto%20news&position=1&from_view=keyword&track=ais&uuid=b672851d-b215-47f1-840b-558c24db4a30";
// ("https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News");
const { Text, Title } = Typography;
const { Options } = Select;

// simplified - is passed from home page
// true if we are in Home page else false

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("top");
  const { data } = useGetCryptosQuery(100);

  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  // console.log(cryptoNews);

  if (!cryptoNews) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {/* {simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase())
            }
          >
            <Option value="top">Cryptocurrency</Option>
            {data?.title.map((coin) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )} */}

      {cryptoNews.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card" style={{ height: "100%" }}>
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.title}
                </Title>
                <img src={newsImg} alt="news" className="crypto-news-logo" />
              </div>
              <p className="news-description">
                {news.description > 100
                  ? `${news.description.substring(0, 100)} ...`
                  : news.description}
              </p>
              <div className="published-on">
                <Text>
                  <span>Published: </span>
                  {moment(news.date).startOf("ss").fromNow(true)}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
