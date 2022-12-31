import DocumentPicker from "react-native-document-picker"
import { checkPermissionForStorage } from "./Permissions";

export const openDocumentPicker = async () => {
    let res = null;
    let permission = await checkPermissionForStorage();
    if (permission) {
        try {
            res = await DocumentPicker.pick({
                type: [
                    DocumentPicker.types.images,
                    // DocumentPicker.types.pdf,
                    // DocumentPicker.types.doc,
                    // DocumentPicker.types.docx,
                ],
            });
        } catch (error) {
            console.log("doc picker", error)
        }
    }
    return res
}

