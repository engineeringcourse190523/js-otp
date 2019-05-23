import {createLocalVue, shallowMount} from '@vue/test-utils'
import View from '@/views/View.vue'
import Api from '@/api'
import Toasted from 'vue-toasted'

describe('View', function () {
    it('should set result to api name', async function () {
        const localVue = createLocalVue();
        localVue.use(Toasted);
        const wrapper = shallowMount(View, {localVue});
        // wrapper.vm.$toasted = jest.fn();
        wrapper.vm.$toasted.show = jest.fn();

        Api.randomEntity = jest.fn();
        Api.randomEntity.mockReturnValue(
            Promise.resolve({
                data: {
                    entries: [
                        {
                            API: 'baozun'
                        }
                    ]
                }
            })
        )

        await wrapper.vm.go();

        expect(wrapper.vm.result).toEqual('baozun');
    });

    it('should show toast for api link', async function () {
        const localVue = createLocalVue();
        localVue.use(Toasted);
        const wrapper = shallowMount(View, {localVue});
        wrapper.vm.$toasted.show = jest.fn();
        Api.randomEntity = jest.fn();
        Api.randomEntity.mockReturnValue(Promise.resolve({
                data: {
                    entries: [
                        {
                            API: 'baozun',
                            Link: 'http://a.com'
                        }
                    ]
                }
            })
        )

        await wrapper.vm.go();

        expect(wrapper.vm.$toasted.show).toBeCalledWith('http://a.com', expect.anything());
    });
});


