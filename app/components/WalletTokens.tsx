import { View, Text, FlatList, Image, Pressable } from "react-native";
import React from "react";
import { TOKENS } from "../constants/Dummies";
import { IToken } from "types";
import { FONTS, SHADOWS, SIZES } from "../constants/Assets";
import Colors from "../constants/Colors";
import { convertTokenToDollars } from "../helpers";

interface IProps {
  showDetails?: boolean;
  onPress?: () => void;
}

const TokenCard = ({
  item,
  showDetails = true,
  onPress,
}: { item: IToken } & IProps) => {
  const hasDecreased = item.status === "D";

  return (
    <Pressable
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: showDetails ? 20 : 10,
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: showDetails ? 50 : 40,
          height: showDetails ? 50 : 40,
          borderRadius: 70,
          justifyContent: "center",
          alignItems: "center",
          marginRight: SIZES.p15,
          marginLeft: showDetails ? 5 : 0,
          ...SHADOWS.shadow8,
        }}
      >
        <Image source={item.icon} style={{ width: "100%", height: "100%" }} />
      </View>
      <View style={{ width: "100%", flex: 1 }}>
        <Text
          style={{
            fontFamily: showDetails ? FONTS.semibold : FONTS.regular,
            fontWeight: "500",
            fontSize: 18,
            marginBottom: showDetails ? 5 : 0,
          }}
        >
          {item.name}
        </Text>
        {showDetails && (
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontFamily: FONTS.monoRegular,
                fontSize: 16,
                color: Colors.black50,
                marginRight: 10,
              }}
            >
              ${convertTokenToDollars(1, item.name)}
            </Text>
            <Text
              style={{
                fontFamily: FONTS.monoRegular,
                fontSize: 16,
                color: hasDecreased ? Colors.red : Colors.green,
              }}
            >
              {hasDecreased ? "-" : "+"}
              {item.rate}%
            </Text>
          </View>
        )}
      </View>
      {showDetails && (
        <View>
          <Text
            style={{
              fontFamily: FONTS.monoMedium,
              fontWeight: "500",
              fontSize: SIZES.large,
              marginBottom: 5,
            }}
          >
            {item.balance} {item.symbol}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

const WalletTokens = ({ showDetails, onPress }: IProps) => {
  return (
    <FlatList
      data={Object.values(TOKENS)}
      renderItem={({ item }) => (
        <TokenCard item={item} showDetails={showDetails} onPress={onPress} />
      )}
      showsVerticalScrollIndicator={false}
      keyExtractor={({ id }) => `${id}`}
    />
  );
};

export default WalletTokens;
