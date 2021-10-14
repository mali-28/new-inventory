import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../context/WorkContext';
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Scatter
  } from "recharts";

const Graph = () => {
    const { writeData, storeInfo, stockInfo, sellStoreName, setSellStoreName, subStocks, setSubStocks, subSells, setSubSells, storestock, setDidAddKey } = useContext(AdminContext);
    const [graphData, setGraphData] = useState([])
    const [graphCoordinate, setGraphCoordinate] = useState([])
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

    useEffect(() => {
        
        let obj = [];
        let newArr = [];
        Object.values(subSells)?.forEach((val) => {
            const splitDate = (val.date).split("/");
            const monthName = monthNames[Number(splitDate[0])-1]
            const monthYear = [monthName, splitDate[2]].join();
            obj.push({ ...val, date: monthYear, quantity: Number(val.quantity) })
            // console.log("objGraph", JSON.stringify(obj))
        })

        for (let i = 0; i < obj?.length; i++) {
            // debugger
            let curr = obj[i];
            let idx = newArr.findIndex((v) => v.date === curr.date);
            if (idx > -1) {
                newArr.splice(idx, 1, { date: newArr[idx].date, quantity: newArr[idx].quantity + curr.quantity });
            } else {
                newArr.push({ date: curr.date, quantity: curr.quantity });
            }
        }
        console.log("newArr", newArr)
        setGraphData(newArr);
        

    }, [subSells])

    useEffect(()=>{
        if(graphData.length > 13){
            setGraphCoordinate(graphData?.slice(graphData.length-12, graphData.length-1))

        }else{
            
            setGraphCoordinate(graphData?.slice(0, graphData.length-1))

        }

    },[graphData])
    console.log("GraphCoordinate",graphCoordinate)
    const options = {
        legend: {
          marginTop: 30,
        },
      };
    return <>
    {(graphCoordinate) ? <ComposedChart
      width={1000}
      height={550}
      data={graphCoordinate}
      margin={{
          top : 20,
          bottom : 20,
          left : 50,
          right : 50
      }}
    >
      <CartesianGrid stroke="#f5f5f5" padding={20}/>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend height={500} wrapperStyle={{
                    marginTop: "10px",
                  }}/>
      <Area type="monotone" dataKey="quantity" fill="#8884d8" stroke="#8884d8" />
      <Bar dataKey="quantity" barSize={20} fill="#413ea0" />
      <Line type="monotone" dataKey="quantity" stroke="#ff7300" />
      <Scatter dataKey="quantity" fill="red" />
    </ComposedChart>
    : null}</>
}

export default Graph;

