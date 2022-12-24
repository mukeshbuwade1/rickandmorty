import { Box, Button, Center, Container, FlatList, Flex, Heading, HStack, Image, Input, Pressable, ScrollView, Text, View, VStack } from 'native-base'
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import COLORS from '../assets/Colors';
import { Dimensions } from 'react-native';
import EmptyList from '../components/EmptyList';
import APIService from '../services/APIService';
import SimpleLoader from '../components/SimpleLoader';

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

// const InfoContainer = (props) => (
//     <View my={2}>
//         <Text color={COLORS.textColorDark} >{props?.title ?? "N/A"}</Text>
//         <Heading color={COLORS.textColorDark}  fontSize={20}>{props?.value ?? ""}</Heading>
//     </View>
// )
const InfoContainer = (props) => (
    <HStack my={2}>
        <Text bold color={COLORS.textColorDark} >{props?.title ?? "N/A"} : </Text>
        <Text color={COLORS.textColorDark} >{props?.value ?? "N/A"}</Text>
    </HStack>
)

const CharacterDetailScreen = (props) => {
    const w = Dimensions.get("window").width
    const routeParam = props.route.params || {}

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
            else console.log("something went wrong")
        } else {
            // alert("api error")
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
                    console.log("originRes------->", originRes)
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
            alert("api error")
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
                paddingTop:30
                // borderWidth:1,borderColor:"red"
            }}
            >
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
                    <Heading py={1} color={COLORS.lightGray} mb={2} fontSize={20}>{details?.name}</Heading>

                </Center>


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

                <Heading mt={5} color={COLORS.lightGray}  fontSize={20}>Origin</Heading>
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

                <Heading mt={5} color={COLORS.lightGray} fontSize={20}>Location</Heading>
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







                <HStack my={2} justifyContent={"space-between"} alignItems={"center"} >


                </HStack>


            </ScrollView>
        </Box>
    )
}

export default CharacterDetailScreen