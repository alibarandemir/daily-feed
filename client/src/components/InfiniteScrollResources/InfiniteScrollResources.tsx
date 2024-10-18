import { Button, Col, Row, Skeleton, Spin } from "antd";
import React, { useEffect, useState } from "react";

import ResourceCard from "../Card/ResourceCard";
import { useAppDispatch, useAppSelector } from "@/hooks/Redux";
import { getAllResources } from "@/stores/Resource/actions";
import { useInView } from "react-intersection-observer";

type Props = {};

export default function InfiniteScrollResources({}: Props) {
  const [page, setPage] = useState<number>(1);
  const { loading, sources, hasMore } = useAppSelector((state) => state.source);
  const dispatch = useAppDispatch();
  const [ref, isInView] = useInView();
  useEffect(() => {
    dispatch(getAllResources({ page }));
  }, []);

  useEffect(() => {
    if (isInView && hasMore) {
      fetchMoreData();
    }
  }, [isInView, hasMore]);
  const fetchMoreData = () => {
    console.log(hasMore);
    if (hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      dispatch(getAllResources({ page: nextPage }));
      console.log("a");
    } else {
      return;
    }
  };
  console.log(sources);
  console.log(isInView);
  return (
    <div>
      <Row
        align="middle"
        justify="center"
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      >
        {loading ? (
          <Skeleton active />
        ) : (
          sources.map((source, index) => (
            <Col
              style={{ display: "flex", justifyContent: "center" }}
              xs={24} 
              sm={12} 
              md={8} 
              className="gutter-row"
              key={index}
            >
              <ResourceCard name={source.name} sourceImg={source.sourceImg} />
            </Col>
          ))
        )}
      </Row>
      <div className="...">
        {(hasMore && (
          <div ref={ref}>
            <Spin />
          </div>
        )) || <p className="...">No more posts to load</p>}
      </div>
    </div>
  );
}
