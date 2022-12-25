import { Box, Center, Heading, HStack, Image, Pressable, ScrollView, Text, View, } from 'native-base'
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import COLORS from '../assets/Colors';
import { Dimensions } from 'react-native';
import APIService from '../services/APIService';
import SimpleLoader from '../components/SimpleLoader';
import font from '../assets/font';

const ContainerComponent = (props) => (
    <View bg={COLORS.cardBg}
        w={"100%"}
        rounded={6}
        px={props?.px ?? 3}
        py={props?.py ?? 3}
        overflow={"hidden"}
        style={props.style}
    >
        {props.children}
    </View>
)

const InfoContainer = (props) => (
    <HStack my={2}>
        <Text style={{ fontFamily: font.Lacquer }} bold color={COLORS.textColorDark} >{props?.title ?? "N/A"} : </Text>
        <Text style={{ fontFamily: font.Lacquer }} color={COLORS.textColorDark} >{props?.value ?? "N/A"}</Text>
    </HStack>
)

const CharacterDetailScreen = (props) => {
    const w = Dimensions.get("window").width
    const routeParam = props.route.params || {}
    // redux hooks
    const [isLoading, setIsLoading] = useState(true);
    const [details, setDetails] = useState(false);
    const [origin, setOrigin] = useState({});
    const [location, setLocation] = useState({});

    useEffect(() => {
        (routeParam.id) && getData(routeParam.id)
    }, [])

    //helper methods
    async function getLocationAndOrigin(obj) {
        let id = obj?.url.split("/").pop()
        let url = 'location/' + id;
        let res = await APIService.getData(url);
        if (!res?.error) {
            if (res.id) {
                return res
            }

        } else {
            alert("res?.errorMsg")
            console.log("ERROR", res?.errorMsg)
        }
    }

    async function getData(id) {
        let url = 'character/' + id;
        let res = await APIService.getData(url);
        if (!res?.error) {
            if (res.id) {
                if (res?.origin) {
                    let originRes = await getLocationAndOrigin(res?.origin)
                    if (originRes) setOrigin(originRes)
                    else setOrigin(res?.origin)
                }
                if (res?.location) {
                    let locationRes = await getLocationAndOrigin(res?.location)
                    if (locationRes) setLocation(locationRes)
                    else setLocation(res?.location)
                }
                setDetails(res)
            }
            else alert("something went wrong")
            setIsLoading(false)
        } else {
            alert(res?.errorMsg)
            console.log("ERROR", res?.errorMsg)
        }
    }

    if (isLoading) return <SimpleLoader />

    return (
        <Box px={3} bg={COLORS.black} flex={1} >
            <Pressable bg={COLORS.cardBg} w={35} h={35}
                rounded={45} zIndex={10} justifyContent={"center"} alignItems={"center"}
                position={"absolute"}
                top={5}
                left={3}
                onPress={() => props.navigation.pop()} >
                <Icon name={"chevron-back-sharp"} color={COLORS.lightGray} size={25} />
            </Pressable>
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: 30
                }}
            >
                {/* profile image and name */}
                <Center  >
                    <Image
                        alt='Character image'
                        source={{ uri: details?.image }}
                        resizeMode={"contain"}
                        w={150}
                        h={150}
                        rounded={100}
                        borderWidth={3}
                        borderColor={COLORS.gray}
                    />
                    <HStack alignItems={"center"} space={2} mb={2}>
                        <Heading py={2} style={{
                            fontFamily: font.Lacquer
                        }} color={COLORS.lightGray} fontSize={25}>{details?.name}</Heading>
                        <View
                            style={{
                                width: 15,
                                height: 15,
                                borderRadius: 15,
                                marginRight: 3,
                                backgroundColor: details?.status == "Alive" ? COLORS.green : COLORS.danger
                            }}
                        />
                    </HStack>
                </Center>
                {/* basic info */}
                <ContainerComponent >
                    <InfoContainer
                        title="Status"
                        value={details?.status}
                    />
                    <InfoContainer
                        title="Species"
                        value={details?.species}
                    />
                    <InfoContainer
                        title="Gender"
                        value={details?.gender}
                    />
                </ContainerComponent>
                {/* origin info */}
                <Heading style={{ fontFamily: font.Lacquer }} mt={5} color={COLORS.lightGray} fontSize={20}>Origin</Heading>
                <ContainerComponent >
                    <InfoContainer
                        title="name"
                        value={origin?.name}
                    />
                    <InfoContainer
                        title="type"
                        value={origin?.type}
                    />
                    <InfoContainer
                        title="dimension"
                        value={origin?.dimension}
                    />
                    <InfoContainer
                        title="Number of residents"
                        value={origin?.residents?.length}
                    />
                </ContainerComponent>
                {/* location info */}
                <Heading style={{ fontFamily: font.Lacquer }} mt={5} color={COLORS.lightGray} fontSize={20}>Location</Heading>
                <ContainerComponent >
                    <InfoContainer
                        title="name"
                        value={location?.name}
                    />
                    <InfoContainer
                        title="type"
                        value={location?.type}
                    />
                    <InfoContainer
                        title="dimension"
                        value={location?.dimension}
                    />
                    <InfoContainer
                        title="Number of residents"
                        value={location?.residents?.length}
                    />
                </ContainerComponent>
            </ScrollView>
        </Box>
    )
}

export default CharacterDetailScreen