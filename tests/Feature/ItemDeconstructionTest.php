<?php

declare(strict_types=1);

namespace Tests\Feature;

use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;
use App\Models\Item;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ItemDeconstructionTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }
    #[Test]
    public function test_returns_deconstruct_components_for_an_item()
    {
        $item = Item::factory()->create();
        $component1 = Item::factory()->create();
        $component2 = Item::factory()->create();

        $item->deconstructComponents()->attach($component1->id, ['amount' => 2]);
        $item->deconstructComponents()->attach($component2->id, ['amount' => 5]);

        $response = $this->actingAs($this->user)
            ->getJson("/api/item/deconstruct_components/{$item->id}");

        $response->assertStatus(200)
            ->assertJsonFragment(['amount' => 2])
            ->assertJsonFragment(['amount' => 5]);
    }
    #[Test]
    public function test_returns_empty_array_if_item_has_no_components()
    {
        $item = Item::factory()->create();

        $response = $this->actingAs($this->user)
            ->getJson("/api/item/deconstruct_components/{$item->id}");

        $response->assertStatus(200)
            ->assertExactJson([]);
    }

    #[Test]
    public function test_can_add_deconstruct_components_to_item(): void
    {
        $item = Item::factory()->create();

        $component1 = Item::factory()->create();
        $component2 = Item::factory()->create();

        $payload = [
            'components' => [
                ['result_item_id' => $component1->id, 'amount' => 3],
                ['result_item_id' => $component2->id, 'amount' => 7],
            ]
        ];

        $response = $this->actingAs($this->user)
            ->postJson("/api/item/{$item->id}/deconstruct_components", $payload);

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Deconstruct components synced',
                'components' => [
                    $component1->id => ['amount' => 3],
                    $component2->id => ['amount' => 7],
                ]
            ]);

        $this->assertDatabaseHas('item_deconstruction_components', [
            'deconstruct_item_id' => $item->id,
            'result_item_id' => $component1->id,
            'amount' => 3
        ]);

        $this->assertDatabaseHas('item_deconstruction_components', [
            'deconstruct_item_id' => $item->id,
            'result_item_id' => $component2->id,
            'amount' => 7
        ]);
    }


    #[Test]
    public function test_can_remove_all_deconstruct_components()
    {
        $item = Item::factory()->create();
        $component = Item::factory()->create();

        $item->deconstructComponents()->attach($component->id, ['amount' => 2]);

        $payload = [
            'result_item_ids' => []
        ];

        $response = $this->actingAs($this->user)
            ->postJson("/api/item/{$item->id}/deconstruct_components", $payload);

        $response->assertStatus(200);

        $this->assertDatabaseMissing('item_deconstruction_components', [
            'item_id' => $item->id,
            'deconstruct_item_id' => $component->id
        ]);
    }
}
