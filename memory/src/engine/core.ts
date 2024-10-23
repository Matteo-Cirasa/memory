import { CardDataImage, CardDataProps } from "../map";

function shuffle(nCards:number) :CardDataProps[]{
    const x= new Array(nCards).fill(true);
    const v1= x.map((y, i) => {
        return {
            selected: false,
            id: i,
            value: i,
        }
    });
    const v1duplicate= x.map((y, i) => {
        return {
            selected: false,
            id: nCards + i,
            value: i,
        }
    });
    const v2= v1.concat(v1duplicate);
    for (let i = v2.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [v2[i], v2[j]] = [v2[j], v2[i]];
      }
      return v2;
}

//percorso per le img
function srci(ky:string, images:CardDataImage): string {
    //@ts-ignore
    return images.src+images[ky];
}

export {
    shuffle,
    srci
}