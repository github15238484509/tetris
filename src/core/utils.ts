/**
 * 随机产生一个min -max 的随机数
 * @param min 
 * @param max 
 */
export function getRandom(min: number, max: number){
    let dis = max - min;
    return Math.floor(Math.random()*dis + min)
}