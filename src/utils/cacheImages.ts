export async function cacheImages(imageArray: string[]){
    await Promise.all(imageArray.map((src: any) => {
        return new Promise<void>((resolve, reject) => {
            const img: any = new Image();

            img.src = src;
            img.onload = resolve();
            img.onerror = reject();
        })
    }));
}