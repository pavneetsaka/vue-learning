import AssignmentList from "./AssignmentList.js";
import AssignmentCreate from "./AssignmentCreate.js";

export default{
    components: {AssignmentList,AssignmentCreate},

    template: `
        <section class="flex gap-8">
            <assignment-list title="In Progress" :assignments="filters.inProgress">
                <assignment-create @add="add" /> <!--@add is the child component function that it emitted and Parent here captures it.-->
            </assignment-list>
            <assignment-list v-show="showSection" title="Completed" :assignments="filters.completed" can-toggle @toggle="showSection = !showSection"></assignment-list>
        </section>
    `,

    data(){
        return{
            greetings: 'Hello World!',
            active: true,
            assignments: [],
            showSection: true
        }
    },
    created(){
        fetch('http://localhost:3000/assignments')
            .then(response => response.json())
            .then(data => this.assignments = data);
    },
    methods:{
        toggle(){
            return this.active = ! this.active
        },
        add(name){
            this.assignments.push({
                name: name,
                complete: false,
                id: (this.assignments.length + 1),
                tag: 'history'
            });
        }
    },
    computed:{
        /*inProgress(){
            return this.assignments.filter(a => ! a.complete)
        },
        completed(){
            return this.assignments.filter(a => a.complete)
        }*/
        filters(){
            return {
                inProgress: this.assignments.filter(a => ! a.complete),
                completed: this.assignments.filter(a => a.complete)
            }
        }
    }
}