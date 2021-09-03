import { message } from 'antd';
import { useRequest } from 'umi';
import { queryProductList, removeProducts } from '@/services/product';

export default function useProductList(params: { pageSize: number; current: number }) {
    const msg = useRequest(() => queryProductList(params));
    const deleteProducts = async (id: string) => {
        try {
            await removeProducts(id);
            message.success('success');
            msg.run();
        } catch (error) {
            message.error('fail');
        }
    };

    return {
        dataSource: msg.data,
        reload: msg.run,
        loading: msg.loading,
        deleteProducts,
    };
}