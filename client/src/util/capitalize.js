export default function capitalize(pageTitle) {
    let str = pageTitle.replace('_', ' ');
    let cap = str.charAt(0).toUpperCase();
    return cap + str.substring(1);
};