import axios from 'axios';

export const api = {
    add_experiment: experiment => {
        const options = {
            method: 'post',
            url: '/api',
            data: {
                command: "createExperiment",
                body: experiment
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            }
        };
        return axios(options);
    },
    fetch_experiments: () => {
        const options = {
            method: 'post',
            url: '/api',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
            data: {
                command: "fetchExperiments"
            }
        };
        return axios(options);
    },
    add_scan: data => {
        const { file, ...restData } = data;
        const options = {
            method: 'post',
            url: '/api',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
            data: {
                command: "createScan",
                body: restData
            }
        };
        axios(options)
            .then(response => {
                file.set('scan_id', response.data, {
                    headers: {
                        'Authorization': localStorage.getItem("token")
                    }
                });
                return axios.post('/upload', file);
            });
    },
    fetch_voltamogramms: data => {
        const options = {
            method: 'post',
            url: '/api',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
            data: {
                command: "fetchVoltamogramms",
                body: data
            }
        };
        return axios(options);
    },
    fetch_single_voltamogramm: data => {
        const options = {
            method: 'post',
            url: '/api',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
            data: {
                command: "fetchSingleVoltamogramm",
                body: data
            }
        };
        return axios(options);
    }
};