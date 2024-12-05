import axios from 'axios';
export default class IdentityHelper {
    async findName(address) {
        let name = address;
        try {
            if (name.length > 12) {
                name = name.slice(0, 6) + '...' + name.slice(-3);
            }
            let lookup_url = 'https://api.nf.domains/nfd/lookup?address=' + address;
            let response = await axios.get(lookup_url);
            if (response && response.data && response.data[address] && response.data[address].name) {
                name = response.data[address].name;
            }
        }
        catch (error) {
        }
        return name;
    }
}
//# sourceMappingURL=identity_helper.js.map