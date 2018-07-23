export default {
    AND: {
        label: 'И',
        formatConj: (children, conj, not, isForDisplay) => {
            return children.size > 1 ?
                (not ? "NOT " : "") + '(' + children.join(' ' + (isForDisplay ? "AND" : "&&") + ' ') + ')'
                : (not ? "NOT (" : "") + children.first() + (not ? ")" : "");
        },
    },
    OR: {
        label: 'ИЛИ',
        formatConj: (children, conj, not, isForDisplay) => {
            return children.size > 1 ?
                (not ? "NOT " : "") + '(' + children.join(' ' + (isForDisplay ? "OR" : "||") + ' ') + ')'
                : (not ? "NOT (" : "") + children.first() + (not ? ")" : "");
        },
    },
};
