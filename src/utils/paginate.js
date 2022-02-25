import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber -1) * pageSize;
    const stepOne = _(items).slice(startIndex);

    return stepOne.take(pageSize).value();

}