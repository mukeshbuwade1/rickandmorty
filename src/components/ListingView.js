import { Center, FlatList, HStack, Image, Pressable, Text, useColorMode, View, VStack } from 'native-base'
import React, { useEffect, useState } from 'react';
import COLORS from '../assets/Colors';
import { Dimensions, RefreshControl, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FooterCompForFlatlist from './FooterCompForFlatlist';
import EmptyList from './EmptyList';
import APIService from '../services/APIService';
import SimpleLoader from './SimpleLoader';
import font from '../assets/font';
import { myColors } from '../theme/theme';
import Icon from 'react-native-vector-icons/dist/Ionicons';


const ListingView = (props) => {
    const { colorMode } = useColorMode()
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
            bg={colorMode === 'dark' ? myColors.primary["700"] : myColors.secondary["500"]} 
                rounded={6}
                overflow={"hidden"}
                my={2}
                onPress={() => navigation.navigate("CharacterDetailScreen", { id: item.id })} >
               
                    <VStack
                        w={Dimensions.get("window").width * 0.40}
                        rounded={'sm'}
                    >
                        <Center >
                            <Image
                                // rounded={6}
                                alt={item?.title ?? "ListingView_image"}
                                resizeMode={"contain"}
                                source={{ uri: item?.image }}
                                w={Dimensions.get("window").width * 0.40}
                                h={Dimensions.get("window").width * 0.40}
                            />
                        </Center>
                        <View px={1} py={2}  bg={colorMode === 'dark' ? myColors.primary["700"] : myColors.secondary["500"]} >
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
                                <Text numberOfLines={1} fontFamily={font.Lacquer} fontSize={11} >{item?.status}</Text>

                                <Text numberOfLines={1} fontFamily={font.Lacquer} fontSize={11} > - {item?.gender}</Text>
                            </HStack>
                            <Text numberOfLines={1} fontSize={15} fontFamily={font.Lacquer} >{item.name}</Text>
                        </View>
                    </VStack>
                
            </Pressable>
        )
    }
    // component return
    const getApiData = () => {
        getData(page + 1)
    }
    if (isLoading) return <SimpleLoader />
    return (
        <FlatList
            data={Data}
            renderItem={renderItem}
            keyExtractor={(e, i) => i}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-evenly" }}
            // onEndReachedThreshold={0.5}
            // onEndReached={() => { getData(page + 1) }}
            ListFooterComponent={Data.length == 0 ? () => { } : () => <FooterCompForFlatlist getData={getApiData} paginationLoading={paginationLoading} />}
            contentContainerStyle={{
                paddingVertical: 10,
                minHeight: "100%",
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