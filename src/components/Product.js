import { Center, FlatList, HStack, Image, Pressable, Text, View, VStack } from 'native-base'
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import COLORS from '../assets/Colors';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FooterCompForFlatlist from './FooterCompForFlatlist';


const Product = () => {
    // react hooks
    const navigation = useNavigation();
    const [page, setPage] = useState(0);
    const [Data, setData] = useState([]);
    const [paginationLoading, setPaginationLoading] = useState(false);
    useEffect(() => (getData()), [])

    //helper methods
    function getData(page) {
        let currnt_page = page ?? 1
        let url = 'https://rickandmortyapi.com/api/character?page=' + currnt_page;
        console.log(url)

        let res = fetch(url)
            .then(res => res.json())
            .then(json => {
                if (json?.results) {
                    if (!page) setData(json?.results)
                    else setData([...Data, ...json?.results])
                    setPage(currnt_page)
                } else {
                    alert("somthing went wrong")
                }
            })
            .catch((e) => console.log("ERROR", e))
    }

    const renderItem = ({ item, index }) => {
        return (
            <Pressable
                bg={"#323232"}
                rounded={6}
                overflow={"hidden"}
                my={2} onPress={() => navigation.navigate("ProductDetailScreen", { id: item.id })} >
                <VStack
                    // bg={COLORS.pr}
                    w={Dimensions.get("window").width * 0.40}
                    // my={2}
                    rounded={'sm'}

                >
                    <Center >
                        <Image
                            rounded={6}
                            alt={item?.title ?? "product_image"}
                            resizeMode={"contain"}
                            source={{ uri: item?.image }}
                            w={Dimensions.get("window").width * 0.40}
                            h={Dimensions.get("window").width * 0.40}

                        />
                    </Center>
                    <View px={1} py={0.5}>
                        <HStack justifyContent={"space-between"} >
                            <HStack alignItems={"center"} >
                                <View 
                                style={{
                                    width:10,
                                    height:10,
                                    borderRadius:5,
                                    marginRight:3,
                                    backgroundColor:item?.status == "Alive"? COLORS.green: COLORS.danger
                                }}
                                     />
                                <Text numberOfLines={1} fontWeight={"bold"} fontSize={11} color={COLORS.white}>{item?.status}</Text>
                            </HStack>
                            <Text numberOfLines={1} fontWeight={"bold"} fontSize={11} color={COLORS.white}>{item?.gender}</Text>
                        </HStack>
                        <Text numberOfLines={1} fontWeight={"bold"} color={COLORS.white} fontSize={15}  >{item.name}</Text>
                    </View>
                </VStack>
            </Pressable>
        )
    }
    // component return
    return (
        // <View style={{backgroundColor:"red" }}>

        <FlatList
            data={Data}
            renderItem={renderItem}
            keyExtractor={(e, i) => i}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-evenly" }}
            onEndReachedThreshold={0.1}
            // onEndReached={()=>getData(page+1)}
            onEndReached={() => { getData(page + 1) }}
            ListFooterComponent={() => <FooterCompForFlatlist paginationLoading={paginationLoading} />}
            contentContainerStyle={{
                paddingVertical: 10,
                //   paddingHorizontal:10,
                backgroundColor: COLORS.black
            }}

        // ListEmptyComponent={<EmptyList />}
        // data={patientList}
        // renderItem={flatListRenderItem}
        // keyExtractor={item => item.id}
        // refreshControl={
        //     <RefreshControl
        //         refreshing={isRefreshing}
        //         onRefresh={() => {
        //             patientListingAPI(null, true)
        //         }}
        //     />
        // }
        />

        // </View>
    )
}
export default Product