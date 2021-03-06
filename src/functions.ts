import { reactive } from "vue";

export const doesTheyTwoEqual = (a: any, b: any) => {
    return a === b
}

export const theGlobalReactiveObject = reactive({
    data: {
        mood: "",
    },
    functions: {
        changeTheMood: (mood: string) => {
            theGlobalReactiveObject.data.mood = mood
        },
    },
})

export const unreactive = (obj: any) => {
    return JSON.parse(JSON.stringify(obj))
}
