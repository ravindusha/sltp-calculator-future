import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
  Text
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [entry, setEntry] = useState(0);
  const [slP, setSlP] = useState(0);
  const [tpP, setTpP] = useState(0);
  const [tpPriceLong, setTpPriceLong] = useState(0);
  const [slPriceLong, setSlPriceLong] = useState(0);
  const [tpPriceShort, setTpPriceShort] = useState(0);
  const [slPriceShort, setSlPriceShort] = useState(0);

  const [amount, setAmount] = useState(0);
  const [leverage, setLeverage] = useState(0);

  const [profitLong, setProfitLong] = useState(0);
  const [profitShort, setProfitShort] = useState(0);
  const [lossLong, setLossLong] = useState(0);
  const [lossShort, setLossShort] = useState(0);

  useEffect(() => {
    if (entry) {
      const slLong = (Number(entry) * (100 - Number(slP))) / 100;
      setSlPriceLong(slLong.toFixed(4));
      const tpLong = (Number(entry) * (100 + Number(tpP))) / 100;
      setTpPriceLong(tpLong.toFixed(4));
      const slShort = (Number(entry) * (100 - Number(slP))) / 100;
      setSlPriceShort(slShort.toFixed(4));
      const tpShort = (Number(entry) * (100 + Number(tpP))) / 100;
      setTpPriceShort(tpShort.toFixed(4));

      setProfitLong((Number(amount) * Number(tpP) * Number(leverage)) / 100);
    }
  }, [slP, tpP, entry, amount, leverage]);

  const copyToClipboard = (text) => {
    try {
      navigator.clipboard.writeText(Number(text).toString());
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      <div className="col">
        <Flex
          direction="row"
          justifyContent="space-between"
          marginTop="10px"
          alignItems="center"
          padding="5px"
        >
          <Text fontSize="xl">Entry</Text>
          <Input
            type="text"
            onChange={(e) => setEntry(e.target.value)}
            value={entry}
            width="300px"
          />
          <Text fontSize="xl">Amount</Text>
          <Input
            type="text"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            width="200px"
          />
          <Text fontSize="xl">Leverage</Text>
          <InputGroup width="200px">
            <Input
              type="text"
              onChange={(e) => setLeverage(e.target.value)}
              value={leverage}
              width="100px"
            />
            <InputRightAddon children="&times;" />
          </InputGroup>
        </Flex>
        <Box borderWidth="1px" padding="15px">
          <div className="row res">
            <Flex direction="row" alignItems="center">
              <Text fontSize="lg" className="eqw">
                SL
              </Text>
              <InputGroup>
                <Input
                  type="text"
                  onChange={(e) => setSlP(e.target.value)}
                  value={slP}
                  className="eqw"
                />
                <InputRightAddon children="%" />
              </InputGroup>
            </Flex>
            <Flex direction="row" alignItems="center">
              <Text fontSize="lg" className="eqw">
                TP
              </Text>
              <InputGroup>
                <Input
                  type="text"
                  onChange={(e) => setTpP(e.target.value)}
                  value={tpP}
                  className="eqw"
                />
                <InputRightAddon children="%" />
              </InputGroup>
            </Flex>
          </div>
        </Box>
        <Divider />
        <Box
          borderWidth="1px"
          padding="15px"
          backgroundColor="green.100"
          marginTop="5px"
        >
          <div className="row res">
            <div className="row eqw">
              <ArrowUpIcon />
              <Text fontSize="lg" className="eqw">
                SL Long
              </Text>
              <Text fontSize="md" color="red.600" fontWeight="bold">
                {lossLong}
              </Text>
              <Text
                fontSize="lg"
                className="eqw"
                onClick={() => copyToClipboard(slPriceLong)}
              >
                {slPriceLong}
              </Text>
            </div>
            <div className="row eqw">
              <Text fontSize="lg" className="eqw">
                TP Long
              </Text>
              <Text fontSize="md" color="green.600" fontWeight="bold">
                {profitLong}
              </Text>
              <Text
                fontSize="lg"
                className="eqw"
                onClick={() => copyToClipboard(tpPriceLong)}
              >
                {tpPriceLong}
              </Text>
            </div>
          </div>
        </Box>
        <Flex padding="5px" />
        <Box borderWidth="1px" padding="15px" backgroundColor="red.100">
          <div className="row res">
            <ArrowDownIcon />
            <div className="row eqw">
              <Text fontSize="lg" className="eqw">
                SL Short
              </Text>
              <Text fontSize="md" color="green.600" fontWeight="bold">
                {profitShort}
              </Text>
              <Text
                fontSize="lg"
                className="eqw"
                onClick={() => copyToClipboard(slPriceShort)}
              >
                {slPriceShort}
              </Text>
            </div>

            <div className="row eqw">
              <Text fontSize="lg" className="eqw">
                TP Short
              </Text>
              <Text fontSize="md" color="red.600" fontWeight="bold">
                {lossShort}
              </Text>
              <Text
                fontSize="lg"
                className="eqw"
                onClick={() => copyToClipboard(tpPriceShort)}
              >
                {tpPriceShort}
              </Text>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
