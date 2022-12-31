
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native'
import { openDocumentPicker } from '../services/documentPicker'
import axios from 'axios'

const Form = () => {
    let initialValues = {
        barcode: "",
        name: "",
        price: "",
        unit: "",
        category: "",
        quantity: "",
        product_description: "",
        image: "",
    }
    const [formValues, setFormValues] = React.useState(initialValues)
    async function submitForm() {
        let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYTJjY2EwNTllNGQ5YjY0OTI0Zjg1NjkwOGUwM2FmZjY5NjFjYTQ2NmJhYmI3ODFkNzgxZWY2NzY3YTJlNjI0NWNhNTMzMzYyNjIzZWI5YzgiLCJpYXQiOjE2NzIyMTIwMzQuNzg5NjI5LCJuYmYiOjE2NzIyMTIwMzQuNzg5NjMyLCJleHAiOjE3MDM3NDgwMzQuNjkwODc0LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.dQIlRX5kQ7sKtko7d19kjMjUvxcMoJYWUg-nY1wP2FC7fuWQ4HRKcczfK55Q95XsMP6kRvLby2mGA9BtOQ-J5Y0WqDUWBK2m-VSqefNxjR93C-XJ_xktCH4H4hQJoboIWGUes3c8VIaRVf1W1aNpSIyFq3OUaxmkzPqD26WK7XzGPxVbLM2lOk5J_jFQQKWvVqSL_TVZ4wnwV0zGBo8NYjtaUQq6gc-l36MQ0y42p0mUWFzNlUPiSNjZhO6orleDJGE3qXrzh7lEYFBR87YNd-zhuLhKdG5VR3vSwfxEq1oyp0u_H4Owd0nkP4oElyBS6mrcU2lJF6owji2quOy91KtjZHZhK48J5RrExJGlufSnGdnFBspQ3NBy2QwVvPpoTD4nUg_HBGiAh4oUnQKGkgD7y96cQa7stNua3QAYuCbITdwstHG0edLBtwFQw18SRWOBwHMBP3Wjoad-QJibKes_sDIX8G3SJ9Y531D1BPvG7OlKHCUVs42S3n7YjNDUvIpu1KsOh1n-DSkSn5TOIgZou32dTdIPCkueThKa8qH3cfUujf67IP66tfKacvbngmWFM_1wTFIHCJGNUDqqAfaoPFOxtW6MNTVJGPk9_jQuQYEB6k7AnQqvsFrsqkkxxeork1XK3A2otqlOuPkHv9k8YMYiaAH4AbPPtMGElqQ"
        let data = new FormData();
        for (const [key, value] of Object.entries(formValues)) {
            console.log(`key = `, key, ` value = `, value);
            if (key == "image")
                data.append("image", formValues.image, formValues.image.name);
            else
                data.append(key, "" + value);
        }
        // return
        console.log("data", data)
        try {
            let headersObj = {
                headers: {
                    "Accept": "*/*",
                    // 'Content-Type': 'application/json',
                    "Content-Type": "multipart/form-data",
                    'Authorization': 'Bearer ' + token
                }
            }
            let url = "http://192.168.1.21:8000/api/product"
            let res = await axios.post(url, data, headersObj);
            console.log("res", res)
            console.log("res.data", res.data)
        } catch (error) {
            console.log("error", error)
        }

    }
    // const submitForm = () => {
    //     console.log(formValues)
    // }
    const handleInput = (key, value) => {
        if (!key && !value) return
        setFormValues({ ...formValues, [key]: value })
    }
    const pikImage = async () => {
        let res = await openDocumentPicker();
        handleInput("image", res[0])
    }
    return (
        <View style={{
            paddingHorizontal: 20, marginVertical: 20, backgroundColor: "#fff",
        }}>
            <ScrollView>
                <View style={{ marginVertical: 10 }}>
                    <Text>barcode</Text>
                    <TextInput
                        placeholder='enter something'
                        style={{ backgroundColor: "#efefef", paddingHorizontal: 10 }}
                        value={formValues.barcode}
                        onChangeText={(tx) => handleInput("barcode", tx)}
                    />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text>name</Text>
                    <TextInput
                        placeholder='enter something'
                        style={{ backgroundColor: "#efefef", paddingHorizontal: 10 }}
                        value={formValues.name}
                        onChangeText={(tx) => handleInput("name", tx)}
                    />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text>price</Text>
                    <TextInput
                        placeholder='enter something'
                        style={{ backgroundColor: "#efefef", paddingHorizontal: 10 }}
                        value={formValues.price}
                        onChangeText={(tx) => handleInput("price", tx)}
                    />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text>unit</Text>
                    <TextInput
                        placeholder='enter something'
                        style={{ backgroundColor: "#efefef", paddingHorizontal: 10 }}
                        value={formValues.unit}
                        onChangeText={(tx) => handleInput("unit", tx)}
                    />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text>category</Text>
                    <TextInput
                        placeholder='enter something'
                        style={{ backgroundColor: "#efefef", paddingHorizontal: 10 }}
                        value={formValues.category}
                        onChangeText={(tx) => handleInput("category", tx)}
                    />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text>quantity</Text>
                    <TextInput
                        placeholder='enter something'
                        style={{ backgroundColor: "#efefef", paddingHorizontal: 10 }}
                        value={formValues.quantity}
                        onChangeText={(tx) => handleInput("quantity", tx)}
                    />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text>product_description</Text>
                    <TextInput
                        placeholder='enter something'
                        style={{ backgroundColor: "#efefef", paddingHorizontal: 10 }}
                        value={formValues.product_description}
                        onChangeText={(tx) => handleInput("product_description", tx)}
                    />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text>upload image</Text>
                    <TouchableOpacity style={{
                        backgroundColor: "#efefef", paddingHorizontal: 10,
                        width: "100%", height: 45, alignItems: "center", flexDirection: "row"
                    }}
                        onPress={pikImage}
                    >
                        <View style={{
                            backgroundColor: "#fff",
                            borderWidth: 1, borderColor: "#aaa",
                            paddingHorizontal: 5,
                        }}>
                            <Text >{(formValues?.image?.name || formValues?.image?.uri) ? "change" : "upload"}</Text>
                        </View >
                        <Text>{formValues?.image?.name ?? formValues?.image?.uri ?? "N/A"}</Text>
                    </TouchableOpacity>
                </View>
                {/* image */}
                <Button onPress={submitForm} title='submit' />
            </ScrollView>
        </View>
    )
}

export default Form


