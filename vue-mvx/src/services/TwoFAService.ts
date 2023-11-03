import { ref, watch } from "vue"
import { EventBus } from '@/events/VueErdEvents';

const twoFACode = ref<string | null>(null)

function set2FACode(code: string) {
    twoFACode.value = code
}

function get2FACode() {
    EventBus.emit('show-modal');
    return new Promise<string>((resolve, reject) => {
        const unwatch = watch(twoFACode, newVal => {
            if (newVal !== null) {
                resolve(newVal);
                unwatch();
                EventBus.off('closed', closeModalListener); // Remove the event listener
            }
        });

        const closeModalListener = () => {
            reject(new Error('Transaction canceled'));
            unwatch();
            EventBus.off('closed', closeModalListener); // Remove the event listener
        };

        EventBus.on('closed', closeModalListener); // Add the event listener
    });
}

export { set2FACode, get2FACode }
