import Assignment from "./Assignment.js";
import AssignmentTag from "./AssignmentTag.js";
import Panel from "./Panel.js";

export default{
    components: {Assignment, AssignmentTag, Panel},

    template: `
        <Panel v-show="assignments.length" class="w-60">
            <div class="flex justify-between items-start">
                <h2 class="font-bold mb-4">{{ title }} ({{ assignments.length }})</h2>
                <button v-show="canToggle" @click="$emit('toggle')">&times;</button>
            </div>

            <assignment-tag v-model:currentTag="currentTag" :initialTags="assignments.map(a => a.tag)" />

            <ul class="border border-gray-600 divide-y divide-gray-600 mt-6">
                <assignment v-for="assignment in filteredAssignments" :key="assignment.id" :assignment="assignment"></assignment>
            </ul>

            <slot />
        </Panel>
    `,
    props: {
        assignments: Array,
        title: String,
        canToggle: {type: Boolean, default: false}
    },
    data() {
        return {
            currentTag: 'all'
        };
    },
    computed: {
        filteredAssignments(){
            return this.currentTag == "all" ? this.assignments : this.assignments.filter(a => a.tag == this.currentTag);
        }
    }
}