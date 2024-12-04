import axios from 'axios';

export default class IdentityHelper {

    /**
     * Find name of address
     * 
     * @param address
     */
    async findName(address: string): Promise<string> {

        let name = address;

        try {
            // Default to truncated address
            if (name.length > 12) {
                name = name.slice(0, 6) + '...' + name.slice(-3);
            }

            // Try to fetch name from nfd service
            let lookup_url = 'https://api.nf.domains/nfd/lookup?address=' + address;
            let response = await axios.get(lookup_url);
            console.log(response);
        } catch (error) {
        }

        return name;
    }
}
