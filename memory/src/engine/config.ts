import { ConfigType } from "../map";

type RootConfigType = {data:ConfigType}

const config:RootConfigType ={
    data:{
        ext:'',
        path:'',
        backCard: '',
        cardLevel:0,
        ptCheck:0,
        ptError:0,
    }
}

function setConfig(data:ConfigType){
    config.data=Object.assign(config.data, data)
}

function getConfig():ConfigType{
    return config.data;
}

export {
    setConfig,
    getConfig
}