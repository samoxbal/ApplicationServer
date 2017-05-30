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
    edit_experiment: experiment => {
        const options = {
            method: 'post',
            url: '/api',
            data: {
                command: "editExperiment",
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
                file.append('scan_id', response.data.data);
                return axios.post('/api', file, {
                    headers: {
                        'Authorization': localStorage.getItem("token")
                    }
                });
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
    },
    fetch_single_measure: data => {
        const options = {
            method: 'post',
            url: '/api',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
            data: {
                command: "fetchSingleMeasure",
                body: data
            }
        };
        return axios(options);
    },
    fetch_measures: data => {
        const options = {
            method: 'post',
            url: '/api',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
            data: {
                command: "fetchMeasures",
                body: data
            }
        };
        return axios(options);
    }
};