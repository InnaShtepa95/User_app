import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';

export interface IValues {
    [key: string]: any;
}

export interface IFormState {
    id: number,
    customer: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class Show extends React.Component<RouteComponentProps<any>, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            customer: {},
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }

    public componentDidMount(): void {
        axios.get(`http://localhost:5000/customers/${this.state.id}`).then(data => {
            this.setState({ customer: data.data });
        })
    }

    private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });
        axios.patch(`http://localhost:5000/customers/${this.state.id}`, this.state.values).then(data => {
            this.setState({ submitSuccess: true, loading: false })
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        })
    }


    private setValues = (values: IValues) => {
        this.setState({ values: { ...this.state.values, ...values } });
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setValues({ [e.currentTarget.id]: e.currentTarget.value })
    }

    public render() {
        const { submitSuccess } = this.state;
        
        return (
            <div className="App">
                {this.state.customer &&
                    <div>
                      
                        <div>
                            <div className={"col-md-12 form-wrapper"}>
                                <h2> Show full information </h2>

                                    <table className="table table-bordered">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Firstname</th>
                                            <th scope="col">Lastname</th>
                                            <th scope="col">Birthday</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">Data</th>
                                            <th scope="col">Description</th>
                                            
                                          
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                            <td>{this.state.customer.first_name}</td>
                                            <td>{this.state.customer.last_name}</td>
                                            <td>{this.state.customer.birth_day}</td>
                                            <td>{this.state.customer.phone}</td>
                                            <td>{this.state.customer.entry}</td>
                                        
                                          
                                           
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(Show)
