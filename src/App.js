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
  const [slPercentage, setSlPercentage] = useState(0);
  const [tpPercentage, setTpPercentage] = useState(0);

  const [slPriceForLong, setSlPriceForLong] = useState(0);
  const [tpPriceForLong, setTpPriceForLong] = useState(0);

  const [slPriceForShort, setSlPriceForShort] = useState(0);
  const [tpPriceForShort, setTpPriceForShort] = useState(0);

  const [tpPriceLong, setTpPriceLong] = useState(0);
  const [slPriceLong, setSlPriceLong] = useState(0);
  const [tpPriceShort, setTpPriceShort] = useState(0);
  const [slPriceShort, setSlPriceShort] = useState(0);

  const [amount, setAmount] = useState(0);
  const [leverage, setLeverage] = useState(0);

  const [profit, setProfit] = useState(0);
  const [loss, setLoss] = useState(0);

  useEffect(() => {
    if (entry) {
      setSlPriceForShort(0);
      setTpPriceForShort(0);
      setSlPriceForLong(0);
      setTpPriceForLong(0);

      const slLong = (Number(entry) * (100 - Number(slPercentage))) / 100;
      setSlPriceLong(slLong.toFixed(4));
      const tpLong = (Number(entry) * (100 + Number(tpPercentage))) / 100;
      setTpPriceLong(tpLong.toFixed(4));
      const slShort = (Number(entry) * (100 + Number(slPercentage))) / 100;
      setSlPriceShort(slShort.toFixed(4));
      const tpShort = (Number(entry) * (100 - Number(tpPercentage))) / 100;
      setTpPriceShort(tpShort.toFixed(4));

      setProfit(
        (Number(amount) * Number(tpPercentage) * Number(leverage)) / 100
      );
      setLoss((Number(amount) * Number(slPercentage) * Number(leverage)) / 100);
    }
  }, [slPercentage, tpPercentage, entry, amount, leverage]);

  useEffect(() => {
    if (!entry) return;

    setSlPriceForShort(0);
    setTpPriceForShort(0);

    const SLPercent = (
      100 -
      (Number(slPriceForLong) * 100) / Number(entry)
    ).toFixed(2);
    const TPPercent = (
      (Number(tpPriceForLong) * 100) / Number(entry) -
      100
    ).toFixed(2);
    setSlPercentage(SLPercent);
    setTpPercentage(TPPercent);
  }, [slPriceForLong, tpPriceForLong]);

  useEffect(() => {
    if (!entry) return;

    setSlPriceForLong(0);
    setTpPriceForLong(0);

    const SLPercent = (
      (Number(slPriceForShort) * 100) / Number(entry) -
      100
    ).toFixed(2);
    const TPPercent = (
      100 -
      (Number(tpPriceForShort) * 100) / Number(entry)
    ).toFixed(2);
    setSlPercentage(SLPercent);
    setTpPercentage(TPPercent);
  }, [slPriceForShort, tpPriceForShort]);

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
                  onChange={(e) => setSlPercentage(e.target.value)}
                  value={slPercentage}
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
                  onChange={(e) => setTpPercentage(e.target.value)}
                  value={tpPercentage}
                  className="eqw"
                />
                <InputRightAddon children="%" />
              </InputGroup>
            </Flex>
          </div>
        </Box>
        <Box borderWidth="1px" padding="15px">
          <Flex>
            <Text fontSize="lg" color="green" fontWeight="bold">
              Long
            </Text>
          </Flex>
          <div className="row res">
            <Flex direction="row" alignItems="center">
              <Text fontSize="lg" className="eqw">
                SL
              </Text>
              <InputGroup>
                <Input
                  type="text"
                  onChange={(e) => setSlPriceForLong(e.target.value)}
                  value={slPriceForLong}
                  className="eqw"
                />
                <InputRightAddon children="Price" />
              </InputGroup>
            </Flex>
            <Flex direction="row" alignItems="center">
              <Text fontSize="lg" className="eqw">
                TP
              </Text>
              <InputGroup>
                <Input
                  type="text"
                  onChange={(e) => setTpPriceForLong(e.target.value)}
                  value={tpPriceForLong}
                  className="eqw"
                />
                <InputRightAddon children="Price" />
              </InputGroup>
            </Flex>
          </div>
          <Divider padding="2px" />
          <Flex>
            <Text fontSize="lg" color="red" fontWeight="bold">
              Short
            </Text>
          </Flex>
          <div className="row res">
            <Flex direction="row" alignItems="center">
              <Text fontSize="lg" className="eqw">
                SL
              </Text>
              <InputGroup>
                <Input
                  type="text"
                  onChange={(e) => setSlPriceForShort(e.target.value)}
                  value={slPriceForShort}
                  className="eqw"
                />
                <InputRightAddon children="Price" />
              </InputGroup>
            </Flex>
            <Flex direction="row" alignItems="center">
              <Text fontSize="lg" className="eqw">
                TP
              </Text>
              <InputGroup>
                <Input
                  type="text"
                  onChange={(e) => setTpPriceForShort(e.target.value)}
                  value={tpPriceForShort}
                  className="eqw"
                />
                <InputRightAddon children="Price" />
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
        <Box
          borderWidth="1px"
          padding="15px"
          backgroundColor="gray.100"
          marginTop="5px"
        >
          <div className="row res">
            {/* <ArrowDownIcon /> */}
            <div className="row eqw">
              <Text fontSize="lg" className="eqw">
                Profit
              </Text>
              <Text fontSize="md" color="green.600" fontWeight="bold">
                {profit.toFixed(2)}
              </Text>
            </div>

            <div className="row eqw">
              <Text fontSize="lg" className="eqw">
                Loss
              </Text>
              <Text fontSize="md" color="red.600" fontWeight="bold">
                {loss.toFixed(2)}
              </Text>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
