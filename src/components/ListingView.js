import {  Center, FlatList, HStack, Image, Pressable, Text, View, VStack } from 'native-base'
import React, { useEffect, useState } from 'react';
import COLORS from '../assets/Colors';
import { Dimensions, RefreshControl,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FooterCompForFlatlist from './FooterCompForFlatlist';
import EmptyList from './EmptyList';
import APIService from '../services/APIService';

const ListingView = (props) => {
    // react hooks
    const navigation = useNavigation();
    const [page, setPage] = useState(0);
    const [Data, setData] = useState([]);

    const [paginationLoading, setPaginationLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => { getData() }, [props.name])


    //helper methods
    async function getData(page, refreshing) {
        if (page) setPaginationLoading(true)
        else if (refreshing || props?.name) setIsRefreshing(true)
        else setIsLoading(true)

        let current_page = page ?? 1
        let url = 'character?page=' + current_page;
        if (props?.name) {
            url = url + "&name=" + props.name
        }
        let res = await APIService.getData(url);
        if (!res?.error) {
            if (res?.results) {
                if (!page) { setData(res?.results) }
                else setData([...Data, ...res?.results])
                setPage(current_page)
            }
        } else {
            if (!page) { setData([]) }
            alert(res?.error)
            console.log("ERROR", res)
        }
        setIsRefreshing(false)
        setIsLoading(false)
        setPaginationLoading(false)
    }
    
    const renderItem = ({ item, index }) => {
        return (
            <Pressable
                bg={COLORS.cardBg}
                rounded={6}
                overflow={"hidden"}
                my={2} onPress={() => navigation.navigate("CharacterDetailScreen", { id: item.id })} >
                <VStack
                    w={Dimensions.get("window").width * 0.40}
                    rounded={'sm'}
                >
                    <Center >
                        <Image
                            rounded={6}
                            alt={item?.title ?? "ListingView_image"}
                            resizeMode={"contain"}
                            source={{ uri: item?.image }}
                            w={Dimensions.get("window").width * 0.40}
                            h={Dimensions.get("window").width * 0.40}
                        />
                    </Center>
                    <View px={1} py={2}>
                        <HStack alignItems={"center"} >
                            <View
                                style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 5,
                                    marginRight: 3,
                                    backgroundColor: item?.status == "Alive" ? COLORS.green : COLORS.danger
                                }}
                            />
                            <Text numberOfLines={1} fontWeight={"bold"} fontSize={11} color={COLORS.white}>{item?.status}</Text>

                            <Text numberOfLines={1} fontWeight={"bold"} fontSize={11} color={COLORS.white}> - {item?.gender}</Text>
                        </HStack>
                        <Text numberOfLines={1} fontWeight={"bold"} color={COLORS.white} fontSize={15}  >{item.name}</Text>
                    </View>
                </VStack>
            </Pressable>
        )
    }
    // component return
    const getApiData = () => {
        getData(page + 1)
    }
    return (
        <FlatList
            data={Data}
            renderItem={renderItem}
            keyExtractor={(e, i) => i}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-evenly" }}
            // onEndReachedThreshold={0.5}
            // onEndReached={() => { getData(page + 1) }}
            ListFooterComponent={Data.length==0?()=>{}: () => <FooterCompForFlatlist getData={getApiData} paginationLoading={paginationLoading} />}
            contentContainerStyle={{
                paddingVertical: 10,
                //   paddingHorizontal:10,
                backgroundColor: COLORS.black,
                minHeight: "100%"
            }}

            ListEmptyComponent={<EmptyList />}

            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={() => {
                        getData(null, true)
                    }}
                />
            }
        />
    )
}
export default ListingView