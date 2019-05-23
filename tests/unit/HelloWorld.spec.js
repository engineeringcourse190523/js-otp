import {shallowMount} from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import Birthday from '@/views/Birthday.vue'

describe('HelloWorld.vue', () => {
    it('renders props.msg when passed', () => {
        const msg = 'new message'
        const wrapper = shallowMount(HelloWorld, {
            propsData: {msg}
        })
        expect(wrapper.text()).toMatch(msg)
    })
});

describe('Birthday', function () {
    it('should be false', async function () {
        const wrapper = shallowMount(Birthday);

        expect(wrapper.text()).toMatch('false');
        expect(wrapper.vm.isBirthday).toEqual(false);
    });

    it('should be true', async function () {
        const wrapper = shallowMount(Birthday, {
            methods: {
                getToday: function () {
                    return new Date('2019-04-09')
                }
            }
        });

        expect(wrapper.vm.isBirthday).toEqual(true);
    });
});
