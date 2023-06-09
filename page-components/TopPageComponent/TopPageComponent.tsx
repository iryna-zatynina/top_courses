import {TopPageComponentProps} from './TopPageComponent.props';
import {Advantages, HhData, Htag, Product, Sort, Tag} from "../../components";
import styles from './TopPageComponent.module.css';
import {TopLevelCategory} from "../../interfaces/page.interface";
import {SortEnum} from "../../components/Sort/Sort.props";
import {sortReducer} from "./sort.reducer";
import {useEffect, useReducer} from "react";
import {declOfNum} from "../../helpers/helpers";
import {useReducedMotion} from "framer-motion";

export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps): JSX.Element => {
    const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReducer, { products, sort: SortEnum.Rating });
    const shouldReduceMotion = useReducedMotion();

    const setSort = (sort: SortEnum) => {
        dispatchSort({ type: sort });
    };
    useEffect(() => {
        dispatchSort({ type: 'reset', initialState: products})
    }, [products]);

    return (
        <>
            <div className={styles.title}>
                <Htag tag='h3'>{page.title}</Htag>
                {products && <Tag color='grey' size='medium' aria-label={declOfNum(products.length, ['элемент', 'элемента', 'элементов'])}>{products.length}</Tag>}
                <Sort sort={sort} setSort={setSort} />
            </div>
            <div role="list">
                {sortedProducts && sortedProducts.map(p => (<Product role="listitem" layout={!shouldReduceMotion} key={p._id} product={p} />))}
            </div>
            <div className={styles.hh}>
                    <Htag tag='h4'>Вакансии - {page.category}</Htag>
                    <Tag color='red' size='medium'>hh.ru</Tag>
            </div>
            {firstCategory === TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
            {page.advantages && page.advantages.length > 0 &&
                <>
                    <Htag tag='h4' >Преимущества</Htag>
                    <Advantages advantages={page.advantages} />
                </>
            }
            {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{__html: page.seoText}} />}
            <Htag tag='h4'>Получаемые навыки</Htag>
            {page.tags.map((t) => <Tag color='primary' key={t}>{t}</Tag>)}

        </>
    );
};