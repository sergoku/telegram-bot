import React, { useState } from "react";
import "./ProductList.css";
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";
import { useCallback, useEffect } from "react";

const products = [
  {
    id: "1",
    title: "Iphone 3",
    price: 5000,
    description: "Iphone",
  },
  {
    id: "2",
    title: "Iphone 4",
    price: 6000,
    description: "Iphone",
  },
  {
    id: "3",
    title: "Iphone 5",
    price: 7000,
    description: "Iphone",
  },
  {
    id: "4",
    title: "Iphone 6",
    price: 122,
    description: "Iphone",
  },
  {
    id: "5",
    title: "Iphone 7",
    price: 5000,
    description: "Iphone",
  },
  {
    id: "6",
    title: "Iphone 8",
    price: 600,
    description: "Iphone",
  },
  {
    id: "7",
    title: "Iphone 10",
    price: 5500,
    description: "Iphone",
  },
  {
    id: "8",
    title: "Iphone 11",
    price: 12000,
    description: "Iphone",
  },
];

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
    return (acc += item.price);
  }, 0);
};

const ProductList = () => {
  const [addedItems, setAddedItems] = useState([]);
  const { tg, queryId } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
      queryId,
    };
    fetch("http://localhost:8000/web-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }, [addedItems]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find((item) => item.id === product.id);
    let newItems = [];

    if (alreadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }

    setAddedItems(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Buy ${getTotalPrice(newItems)}`,
      });
    }
  };

  return (
    <div className={"list"}>
      {products.map((item) => (
        <ProductItem product={item} onAdd={onAdd} className={"item"} />
      ))}
    </div>
  );
};

export default ProductList;
